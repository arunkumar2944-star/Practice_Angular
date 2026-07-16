import { Service, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class CommonMethods {
    setheader(): HttpHeaders {
        const token = this.getfromLS('token');
        // console.log('token ' +token);

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        // console.log(headers)

        return headers;
    }


    // update(identifier:string,inpustring:string) {
    //     // .set({ ...inpustring });

    //     this.updatToLS(identifier,inpustring)
    // }

    getfromLS(identifier: string) {
        const lsString = localStorage.getItem(identifier)
        return JSON.parse(lsString || '[]')

    }

    updatToLS(identifier: string, ROString: any) {
        localStorage.setItem(

            identifier,
            JSON.stringify(ROString)
        )
    }
}

