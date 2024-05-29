import React from 'react'
import Image from 'next/image'

const PDFbutton = ({ generatePDF }) => {
    return (
        <div className="flex items-center justify-center gap-1 ">
            <label className="text-md font-bold" htmlFor="">
                Generate Report
            </label>
            <button onClick={generatePDF} className="mr-4">
                <Image src="/pdf.jpg" alt="PDF" width={24} height={24} />
            </button>
        </div>

    )
}

export default PDFbutton;