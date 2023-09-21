import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCoutDonwButton,
  StopCoutDonwButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'
import { useContext } from 'react'

const newCicleFormValidatioSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser no mínimo de 5 minutos')
    .max(60, 'O ciclo precisa ser no máximo de 60 minutos'),
})

type NewCicleFormData = zod.infer<typeof newCicleFormValidatioSchema>

export function Home() {
  const { activeCycle, CreateNewCycle, InterruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCicleFormData>({
    resolver: zodResolver(newCicleFormValidatioSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCicleFormData) {
    CreateNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="submit">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCoutDonwButton onClick={InterruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCoutDonwButton>
        ) : (
          <StartCoutDonwButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCoutDonwButton>
        )}
      </form>
    </HomeContainer>
  )
}
