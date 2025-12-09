import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Card from '../components/Card'
import { checkInApi } from '../api'
import { useAuthStore } from '../store/authStore'

const CheckIn = () => {
  const [mood, setMood] = useState<number | undefined>(undefined)
  const [craving, setCraving] = useState<number | undefined>(undefined)
  const [notes, setNotes] = useState('')
  const user = useAuthStore((s) => s.user)

  const create = useMutation({
    mutationFn: () => checkInApi.create({ mood, craving_level: craving, notes }),
  })

  return (
    <Card title="Daily check-in" subtitle="Mood, craving, triggers">
      <form className="space-y-3">
        <label className="block text-sm text-slate-600">
          Mood (1-5)
          <input
            className="mt-1 input-field"
            type="number"
            min={1}
            max={5}
            value={mood ?? ''}
            onChange={(e) => setMood(e.target.value ? Number(e.target.value) : undefined)}
          />
        </label>
        <label className="block text-sm text-slate-600">
          Craving (1-5)
          <input
            className="mt-1 input-field"
            type="number"
            min={1}
            max={5}
            value={craving ?? ''}
            onChange={(e) => setCraving(e.target.value ? Number(e.target.value) : undefined)}
          />
        </label>
        <label className="block text-sm text-slate-600">
          Notes
          <textarea
            className="mt-1 input-field"
            rows={3}
            placeholder="What helped today?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="btn-primary w-full disabled:opacity-60"
            type="button"
            onClick={() => create.mutate()}
            disabled={create.isPending}
          >
            {create.isPending ? 'Saving…' : 'Save check-in'}
          </button>
          <button className="btn-ghost w-full" type="button">
            Save & share with chat
          </button>
        </div>
        {!user && <p className="text-xs text-red-500">Sign in to send check-ins to the API.</p>}
        {create.isError && <p className="text-xs text-red-500">Error: {(create.error as Error).message}</p>}
        {create.isSuccess && <p className="text-xs text-green-600">Saved!</p>}
      </form>
    </Card>
  )
}

export default CheckIn
