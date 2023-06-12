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

  return (
    <main className='main'>
      <div >
        <input onChange={onFileChange} type="file" id="input" accept='.xlsx' required />
      </div>
      <div className='classroom'>
        <div id='whiteBoard'>
          <span>white board</span>
        </div>
        <div id='seats'>
          {data && data.map(student => <Student key={student.id} student={student} />)}
        </div>
      </div>
    </main>
  )
}


const Student = ({ student }) => {
  const selfId = `${student.first_name}_${student.id}`;

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("movedStudentId", selfId);
    console.count("drag!!!");
  }

  function drop(ev) {
    console.count("drop!!!");

    const movedStudent = document.getElementById(
      ev.dataTransfer.getData("movedStudentId"),
    );
    const self = document.getElementById(selfId);
    self.parentElement.style.border = 'RGB(237, 82, 73)'
    self.parentElement.style.backgroundColor = 'RGB(237, 82, 73)'
    movedStudent.parentElement.style.border = 'RGB(237, 82, 73)'
    movedStudent.parentElement.style.backgroundColor = 'RGB(237, 82, 73)'

    const temp = self.innerText;

    self.innerText = movedStudent.innerText;

    movedStudent.innerText = temp;
    ev.preventDefault();
  }

  return (
    <div
      onDrop={(e) => drop(e)}
      onDragOver={(e) => allowDrop(e)}
      className="student"
      draggable
      onDragStart={drag}>
      <span id={selfId}>
        {student.id}. {student.first_name} {student.last_name}
      </span>
    </div>
  );
};