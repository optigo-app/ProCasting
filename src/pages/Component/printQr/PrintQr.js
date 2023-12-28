import React from 'react'
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

export default function PrintQr() {

    const navigation = useNavigate();

    const handlePrint = () => {
        window.print();
        navigation('/')
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <tbody>
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
                                <span id="metaltype" style={{ display: 'inline', width: '40mm' }}>NA </span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td class="pb5">
                            <label class="details">
                                <span id="batchno" style={{ display: 'inline', width: '40mm' }}>UB </span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="details">
                                <span id="purity" style={{ display: 'inline', width: '40mm' }}>NA </span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td class="pb5">
                            <label class="details">
                                <span id="color" style={{ display: 'inline', width: '40mm' }}>NA </span>
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
                                <span id="treeweight" style={{ display: 'inline', width: '40mm' }}>0.000</span>
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
                                <span id="waxsettingweight" style={{ display: 'inline', width: '40mm' }}>0.000 </span>
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
                                <span id="CSweight" style={{ display: 'inline', width: '40mm' }}>0.000 </span>
                            </label>
                        </td>
                    </tr>
                </tbody>

                <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <QRCode value="100" />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{ height: '40px', width: '100px' }} onClick={handlePrint}>PRINT QR</button>
                {/* onClick={() => navigation('/createTree')} */}
            </div>

        </div>
    )
}
