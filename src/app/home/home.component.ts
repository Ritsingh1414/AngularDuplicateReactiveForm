import { Component, OnInit } from '@angular/core';
import { AuthService } from './../Services/auth.service';
import { Router } from "@angular/router";

import * as pack from './../../../package.json';
import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;
type AOA = any[][];
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  istToGmt:'';
  gmtToIst: '';
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }
  printPackage() {
    console.log( pack);
  }
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      //console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  generatePdf(){
    const documentDefinition = { content: this.data };
    pdfMake.createPdf(documentDefinition).open();
   }

   logout() {
     this.authService.logout();
     if (this.authService.currentUserValue) { 
        this.router.navigate(['/home']);
      }else {
        this.router.navigate(['/login']);
      }

   }

}
