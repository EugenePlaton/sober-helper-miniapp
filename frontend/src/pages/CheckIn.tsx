import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Card from '../components/Card'
import { ApiError, checkInApi, journalApi } from '../api'
import { useAuthStore } from '../store/authStore'
import UpgradeNotice from '../components/UpgradeNotice'
import { useTranslation } from 'react-i18next'

const CheckIn = () => {
  const { t } = useTranslation()
  const [mood, setMood] = useState<number | undefined>(undefined)
  const [craving, setCraving] = useState<number | undefined>(undefined)
  const [notes, setNotes] = useState('')
  const [journalNote, setJournalNote] = useState('')
  const user = useAuthStore((s) => s.user)
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: () => checkInApi.create({ mood, craving_level: craving, notes }),
  })
  const saveJournal = useMutation({
    mutationFn: () => journalApi.create({ content: journalNote }),
    onSuccess: () => {
      setJournalNote('')
      queryClient.invalidateQueries({ queryKey: ['journal'] })
    },
  })

  return (
    <Card title={t('checkin.title')} subtitle={t('checkin.subtitle')}>
      <form className="space-y-3">
        <label className="block text-sm text-slate-600">
          {t('checkin.mood')}
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
          {t('checkin.craving')}
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
          {t('checkin.notes')}
          <textarea
            className="mt-1 input-field"
            rows={3}
            placeholder={t('checkin.notesPlaceholder')}
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
            {create.isPending ? 'Saving…' : t('checkin.save')}
          </button>
          <button
            className="btn-ghost w-full disabled:opacity-60"
            type="button"
            onClick={() => saveJournal.mutate()}
            disabled={saveJournal.isPending || !journalNote}
          >
            {saveJournal.isPending ? 'Saving…' : t('checkin.saveNote')}
          </button>
        </div>
        {!user && <p className="text-xs text-red-500">{t('checkin.signIn')}</p>}
        {create.isError &&
          (create.error instanceof ApiError && create.error.status === 402 ? (
            <UpgradeNotice message={create.error.message} />
          ) : (
            <p className="text-xs text-red-500">Error: {(create.error as Error).message}</p>
          ))}
        {create.isSuccess && <p className="text-xs text-green-600">{t('checkin.saved')}</p>}
        {saveJournal.isSuccess && <p className="text-xs text-green-600">{t('checkin.noteSaved')}</p>}
      </form>
      <div className="mt-4">
        <p className="text-sm text-slate-700 mb-2">{t('checkin.journalTitle')}</p>
        <textarea
          className="input-field"
          rows={3}
          placeholder={t('checkin.journalPlaceholder')}
          value={journalNote}
          onChange={(e) => setJournalNote(e.target.value)}
        />
      </div>
    </Card>
  )
}

export default CheckIn
