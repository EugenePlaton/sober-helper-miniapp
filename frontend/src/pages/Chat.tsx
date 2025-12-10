import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Card from '../components/Card'
import { ApiError, chatApi } from '../api'
import { useAuthStore } from '../store/authStore'
import UpgradeNotice from '../components/UpgradeNotice'

const Chat = () => {
  const user = useAuthStore((s) => s.user)
  const [message, setMessage] = useState('')
  const queryClient = useQueryClient()

  const historyQuery = useQuery({
    queryKey: ['chat-history'],
    queryFn: () => chatApi.history(30),
    enabled: !!user,
  })

  const summaryQuery = useQuery({
    queryKey: ['chat-summary'],
    queryFn: () => chatApi.summary(),
    enabled: !!user,
  })

  const sendMutation = useMutation({
    mutationFn: () => chatApi.send({ role: 'user', content: message }),
    onSuccess: () => {
      setMessage('')
      queryClient.invalidateQueries({ queryKey: ['chat-history'] })
      queryClient.invalidateQueries({ queryKey: ['chat-summary'] })
    },
  })

  const refreshSummary = useMutation({
    mutationFn: () => chatApi.refreshSummary(),
    onSuccess: () => summaryQuery.refetch(),
  })

  if (!user) {
    return (
      <Card title="AI Chat" subtitle="Авторизуйтесь, чтобы вести диалог">
        <p className="text-sm text-muted">Login or Telegram auth required to load your chat history.</p>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Card title="AI Chat" subtitle="OpenRouter-powered assistant">
        <div className="space-y-3 text-sm">
          {historyQuery.isLoading && <p className="text-muted text-sm">Loading messages…</p>}
          {historyQuery.data?.map((m) => (
            <div
              key={m.id}
              className={`rounded-tele p-3 border ${
                m.role === 'assistant' ? 'bg-surface border-border' : 'bg-primary text-white border-primary'
              }`}
            >
              <p className="text-xs opacity-80 mb-1 capitalize">{m.role}</p>
              <p>{m.content}</p>
            </div>
          ))}
          <div className="flex gap-2 mt-3">
            <input
              className="input-field flex-1"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="btn-primary px-4 disabled:opacity-60"
              disabled={!message || sendMutation.isPending}
              onClick={() => sendMutation.mutate()}
            >
              {sendMutation.isPending ? 'Sending…' : 'Send'}
            </button>
          </div>
          {(sendMutation.isError || historyQuery.isError) && (
            <>
              {sendMutation.isError && sendMutation.error instanceof ApiError && sendMutation.error.status === 402 ? (
                <UpgradeNotice message={sendMutation.error.message} />
              ) : (
                <p className="text-xs text-red-500">
                  {sendMutation.isError
                    ? (sendMutation.error as Error).message
                    : (historyQuery.error as Error).message}
                </p>
              )}
            </>
          )}
        </div>
      </Card>

      <Card title="Summary" subtitle="Auto-updated after messages">
        {summaryQuery.isLoading && <p className="text-sm text-muted">Loading summary…</p>}
        {summaryQuery.isError && <p className="text-sm text-red-500">{(summaryQuery.error as Error).message}</p>}
        <p className="text-sm text-slate-800 whitespace-pre-wrap">
          {summaryQuery.data?.summary || 'No summary yet — send a few messages to generate one.'}
        </p>
        <div className="flex gap-2 mt-3">
          <button
            className="btn-ghost w-full disabled:opacity-60"
            onClick={() => summaryQuery.refetch()}
            disabled={summaryQuery.isFetching}
          >
            {summaryQuery.isFetching ? 'Refreshing…' : 'Refresh'}
          </button>
          <button
            className="btn-primary w-full disabled:opacity-60"
            onClick={() => refreshSummary.mutate()}
            disabled={refreshSummary.isPending}
          >
            {refreshSummary.isPending ? 'Rebuild…' : 'Rebuild summary'}
          </button>
        </div>
      </Card>
    </div>
  )
}

export default Chat
