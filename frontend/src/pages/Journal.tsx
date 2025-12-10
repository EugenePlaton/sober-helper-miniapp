import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Card from '../components/Card'
import { journalApi } from '../api'
import { useAuthStore } from '../store/authStore'

const Journal = () => {
  const [content, setContent] = useState('')
  const user = useAuthStore((s) => s.user)
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: ['journal'],
    queryFn: () => journalApi.list(20),
    enabled: !!user,
  })

  const create = useMutation({
    mutationFn: () => journalApi.create({ content }),
    onSuccess: () => {
      setContent('')
      queryClient.invalidateQueries({ queryKey: ['journal'] })
    },
  })

  if (!user) {
    return (
      <Card title="Journal">
        <p className="text-sm text-muted">Login to save and view your journal entries.</p>
      </Card>
    )
  }

  return (
    <Card title="Journal">
      <div className="space-y-3">
        <textarea
          className="input-field"
          rows={4}
          placeholder="Write freely"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="btn-primary w-full disabled:opacity-60"
          onClick={() => create.mutate()}
          disabled={create.isPending || !content}
        >
          {create.isPending ? 'Saving…' : 'Save note'}
        </button>
        {create.isError && <p className="text-xs text-red-500">Error: {(create.error as Error).message}</p>}
        <div className="space-y-2">
          {listQuery.isLoading && <p className="text-sm text-muted">Loading notes…</p>}
          {listQuery.data?.map((entry) => (
            <div key={entry.id} className="card p-3 border border-border text-sm">
              <p className="text-xs text-muted mb-1">{entry.created_at}</p>
              <p className="text-slate-800 whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default Journal
