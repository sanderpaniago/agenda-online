import Input from "../components/Input";
import { useState } from "react";

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
        <div className='mt-56 md:mt-0 w-11/12 mx-auto'>
            <form onSubmit={handleSubmit} className='flex-col bg-gray-50 max-w-screen-lg shadow-lg m-auto md:flex-row flex justify-between p-8 rounded-xl'>
              <div className='w-full md:w-5/12'>
                <Input name='nome' type="text" placeholder='Digite seu nome...' name='Nome' value={name} onChange={ e => setName(e.target.value)}/>
                
                <div className='flex flex-col  mb-4'>
                  <label className='text-blue-900 font-medium' htmlFor="">Selecione seu horario</label>
                  <input className='bg-gray-100 h-12 p-4 rounded' type='datetime-local' value={data} onChange={e => setData(e.target.value)} />
                    
                </div>
                <div className='flex flex-col mb-4'>
                  <label className='text-blue-900 font-medium' htmlFor="">Selecione o serviço desejado</label>
                  <select className='bg-gray-100 h-12 p-4 rounded' defaultValue='' value={servico} onChange={e=> setServico(e.target.value)}>
                    <option value='' selected disabled hiddem>Selecione o Servico</option>
                    {servicosList && (
                      servicosList.map((item, key) => {
                        return <option key={key} value={item.servico}>{item.servico}</option>
                      }))
                    }
                  </select>
                </div>
                
              </div>
              <div className=' bg-gray-200 w-full md:w-1/2 rounded-lg px-8 pt-4 shadow-xl relative'>
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

                <button className='h-12 my-5 bg-blue-500 px-2 text-white font-bold rounded md:absolute md:right-6 md:bottom-4'>Confimar agendamento</button>
              </div>
            </form>

        </div>
      </main>
    </div>
  )
}

Home.getInitialProps = async ({ req }) =>{
 

  const res = await fetch(`http://agendaonline.sanderpaniago.dev/api/get-servico`)
   const data = await res.json()

  return {servicosList: data }
}
