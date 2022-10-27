import React, { useState } from 'react';

function App() {
  const [dayIn, setDayIn] = useState('');
  const [dayOut, setDayOut] = useState('');
  const [budget, setBudget] = useState(0);


  function getDate(){
    let dateArray = [];
    let totalPrices = 0;

    const daysBetweenDates = (new Date(dayOut) - new Date(dayIn)) / (1000 * 60 * 60 * 24) + 1;

    const currentDay = new Date(dayIn); // Prepara o dayIn (recebido por input), no formato do objeto DATE do JavaScript.
    // Ao iniciar no objeto DATE do JS, você recebe um dia antes, é necessário adicionar um dia para ficar correto.
    currentDay.setDate(currentDay.getDate() + 1);  // Adiciona um dia ao currentDay.

    // Loop que popula o dateArray, cada item é uma data que está entre o dayIn e o dayOut.
    for(let i = 0; i < daysBetweenDates; i++){
      const formatedDate = currentDay.getFullYear() + '/' + (currentDay.getMonth() + 1) + '/' + currentDay.getDate();
      dateArray.push(formatedDate); 

      currentDay.setDate(currentDay.getDate() + 1); // Aumenta em 1 o dia do currentDay.
    }

    /* Loop que recebe as datas vindo do dateArray, verifica em qual período a data analisada está,
    e adiciona ao valor do preço total o preço referente. */
    dateArray.forEach((date) => {
      const dateInComparison = new Date(date);
      
      // De 20/10/2022 até 27/10/2022 valor de 96 reais/dia.
      if(dateInComparison >= new Date('10/20/2022') && dateInComparison <= new Date('10/27/2022')){
        totalPrices += 96;
      }
      
      // De 28/10/2022 até 30/11/2022 valor de 80 reais/dia.
      if(dateInComparison >= new Date('10/28/2022') && dateInComparison <= new Date('11/30/2022')){
        totalPrices += 80;
      }
      
    })

    // Adiciona a várivael budget o valor total.
    setBudget(totalPrices);
  }

  return (
    <>
    <div className='font-bold text-slate-800 bg-white lg:bg-slate-800 gap-4 mt-10 rounded-xl font-sans flex-col lg:flex items-center justify-center mx-auto w-1/3 py-10 text-center'>
      <h1 className='text-white text-3xl'> Hotel Simulation </h1>
      <div className='flex flex-row w-full justify-evenly'>
        <input type="date" value={dayIn} onChange={(e) => setDayIn(e.target.value)}/>
        <input type="date" value={dayOut} onChange={(e) => setDayOut(e.target.value)}/>
      </div>
      <div className='flex flex-col justify-around w-full items-center gap-2'>
        <button onClick={getDate} type="button" className='text-slate-800 bg-white rounded-xl p-3'> Calcular preço </button>
        <h1 className='text-white'> R$ {budget},00 </h1>
      </div>
    </div>
    </>
  );
}

export default App;
