'use client'

import * as XLSX from 'xlsx'
import './styles.css'
import { useState } from 'react'

export default function Home() {

  const [data, setData] = useState()

  const onFileChange = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  }

  console.log({ data })

  return (
    <main className='main'>
      <div >
        <input onChange={onFileChange} type="file" id="input" accept='.xlsx' required />
      </div>
      <div className='classroom'>
        <div id='whiteBoard'>white board</div>
        {data && data.map(student => <Student student={student} />)}
      </div>
    </main>
  )
}


const Student = ({ student }) => {
  return <div className='student'>
    <span>{student.id}. {student.first_name} {student.last_name}</span>
    </div>
}