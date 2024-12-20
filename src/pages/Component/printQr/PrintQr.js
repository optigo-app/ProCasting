import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CommonAPI } from '../../../Utils/API/CommonApi'
import "./printqr.css"

export default function PrintQr() {

    const navigation = useNavigate();
    let location = useLocation()

    const [qrdata,setQrData]= useState();

    const handlePrint = () => {
        window.print();
        // navigation('/')
    }

    const handlePrintQrApi = async() =>{

       let castuniqueno = location?.state?.castuniqueno
       let empData = JSON.parse(localStorage.getItem("getemp"))
       let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken 

       let bodyparam = {
        "castuniqueno": `${castuniqueno}`,
        "empid": `${empData?.empid}`,
        "empuserid":`${empData?.empuserid}`,
        "empcode": `${empData?.empcode}`,
        "deviceToken": `${deviceT}`
      }

      let ecodedbodyparam = btoa(JSON.stringify(bodyparam))

      let body = {
        "con":`{\"id\":\"\",\"mode\":\"GETTREEQR\",\"appuserid\":\"${empData?.empuserid}\"}`,
        "p":`${ecodedbodyparam}`,  
        "f":"formname (album)"
      }   

      await CommonAPI(body).then((res)=>{
        if(res?.Data.rd[0].stat == 1){
            setQrData(res?.Data.rd[0])
        }
      }).catch((err)=>{
           console.log("err",err) 
      })

    }
    
    useEffect(()=>{
        handlePrintQrApi()
    },[])


    return (
        <div>
            <div style={{width:'100%'}}></div>
            <div className='printqr_main_container'>

                <tbody className='printqr_tbody'>
                    <tr>
                        <td>
                            <label class="details">
                                <span style={{ display: 'inline', width: '40mm' }}>METAL</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="details">
                                <span id="metaltype" style={{ display: 'inline', width: '40mm' }}>{qrdata?.metaltype}</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td class="pb5">
                            <label class="details">
                                <span id="batchno" style={{ display: 'inline', width: '40mm' }}>{qrdata?.CastBatchNo}</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="details">
                                <span id="purity" style={{ display: 'inline', width: '40mm' }}>{qrdata?.metalpurity}</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td class="pb5">
                            <label class="details">
                                <span id="color" style={{ display: 'inline', width: '40mm' }}>{qrdata?.MetalColor}</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="details">
                                <span style={{ display: 'inline', width: '40mm' }}>TREE WT</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="details">
                                <span id="treeweight" style={{ display: 'inline', width: '40mm' }}>{qrdata?.TreeWeight}</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="details">
                                <span style={{ display: 'inline', width: '40mm' }}>DIA WT.</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="details">
                                <span id="waxsettingweight" style={{ display: 'inline', width: '40mm' }}>{qrdata?.DiaWt}</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="details">
                                <span style={{ display: 'inline', width: '40mm' }}>CS WT.</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="details">
                                <span id="CSweight" style={{ display: 'inline', width: '40mm' }}>{qrdata?.CSWt}</span>
                            </label>
                        </td>
                    </tr>
                </tbody>

                <div className='printqr_qrcode'>
                    <QRCode value={`${qrdata?.CastUniqueno}`} />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }} className='no-print'>
                <button style={{ height: '40px', width: '100px' }} onClick={handlePrint}>PRINT QR</button>
                {/* onClick={() => navigation('/createTree')} */}
            </div>
        </div>
    )
}
