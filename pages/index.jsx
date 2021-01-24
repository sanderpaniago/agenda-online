import Input from "../components/Input";
import { useState } from "react";
import { set } from "date-fns";

export async function getStaticProps(context) {
  const res = await fetch('http://localhost:3001/api/get-servico')
  const data = await res.json()
  if(!res) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      servicosList: data
    }
  }

}

export default function Home({servicosList}) {
  const [name, setName] = useState('')
  const [servico, setServico] = useState('')
  const [data, setData] = useState('')

  function dataTime(data) {
    const dataArray = data.split('T')
    const dia = dataArray[0]
    const hora = dataArray[1]

    return `${dia} ${hora}`
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const infoForm = {
      name,
      servico,
      startData: data,
    }

    try {
      const response = await fetch('/api/post-calendar', {
        method: 'POST',
        body: JSON.stringify(infoForm),
      })

      if(!response.status) {
        alert('Ocorreu um erro... Tente novamente mais tarde!')
      }

      alert('Horario agendado com sucesso.')
      setData('')
      setName('')
      setServico('')
      
    } catch (err) {
      console.log(err)
    }
  }

  

  return (
    <div className='bg-blue-50 w-sreen h-screen flex flex-col item-center justify-center'>
      <header className='absolute top-0 w-full'>
        <div className="container mx-auto flex justify-between pt-6">
          <h2 className='text-3xl font-bold text-blue-900'>Sua Agenda Online</h2>
          <button className='h-12 bg-blue-500 px-2 text-white font-bold rounded'>Agendamento</button>
        </div>
      </header>

      <main>
        <div className=''>
            <form onSubmit={handleSubmit} className='bg-gray-50 max-w-screen-lg shadow-lg m-auto flex justify-between p-8 rounded-xl'>
              <div className='w-5/12'>
                <Input name='nome' type="text" placeholder='Digite seu nome...' name='Nome' value={name} onChange={ e => setName(e.target.value)}/>
                
                <div className='flex flex-col mb-4'>
                  <label className='text-blue-900 font-medium' htmlFor="">Selecione seu horario</label>
                  <input className='bg-gray-100 h-12 p-4 rounded' type='datetime-local' value={data} onChange={e => setData(e.target.value)} />
                    
                </div>
                <div className='flex flex-col mb-4'>
                  <label className='text-blue-900 font-medium' htmlFor="">Selecione o serviço desejado</label>
                  <select className='bg-gray-100 h-12 p-4 rounded' value={servico} onChange={e=> setServico(e.target.value)}>
                    <option value='' selected disabled hiddem>Selecione o Servico</option>
                    {servicosList.map((item, key) => {
                      return <option key={key} value={item.servico}>{item.servico}</option>
                    })}
                  </select>
                </div>
                
              </div>
              <div className=' bg-gray-200 w-1/2 rounded-lg px-8 pt-4 shadow-xl relative'>
                <div className='flex justify-between mt-4'>
                  <p className='text-blue-900 font-bold'>Agendamento</p>
                  <span>{data}</span>
                </div>
                <div className='mt-10 h-12'>
                  <h6 className='text-blue-900 font-bold'>Nome:</h6>
                  <p> {name}</p>
                </div>
                <div className='mt-6'>
                  <h6 className='text-blue-900 font-bold'>Serviço:</h6>
                  <p>{servico}</p>
                </div>

                <button className='h-12 bg-blue-500 px-2 text-white font-bold rounded absolute right-6 bottom-4'>Confimar agendamento</button>
              </div>
            </form>

        </div>
      </main>
    </div>
  )
}
