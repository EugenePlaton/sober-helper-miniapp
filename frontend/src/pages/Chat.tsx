import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Card from '../components/Card'
import { ApiError, chatApi } from '../api'
import { useAuthStore } from '../store/authStore'
import UpgradeNotice from '../components/UpgradeNotice'

const Chat = () => {
  const { t } = useTranslation()
  const user = useAuthStore((s) => s.user)
  const [message, setMessage] = useState('')
  const queryClient = useQueryClient()

  const historyQuery = useQuery({
    queryKey: ['chat-history'],
    queryFn: () => chatApi.history(30),
    enabled: !!user,
  })

  const sendMutation = useMutation({
    mutationFn: () => chatApi.send({ role: 'user', content: message }),
    onSuccess: () => {
      setMessage('')
      queryClient.invalidateQueries({ queryKey: ['chat-history'] })
    },
  })

  if (!user) {
    return (
      <Card title={t('chat.title')} subtitle={t('chat.subtitle')}>
        <p className="text-sm text-muted">{t('chat.unauthorized')}</p>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('chat.title')} subtitle={t('chat.subtitle')}>
        <div className="space-y-3 text-sm">
          {historyQuery.isLoading && <p className="text-muted text-sm">{t('chat.loading')}</p>}
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
              placeholder={t('chat.placeholder')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="btn-primary px-4 disabled:opacity-60"
              disabled={!message || sendMutation.isPending}
              onClick={() => sendMutation.mutate()}
            >
              {sendMutation.isPending ? t('chat.sending') : t('chat.send')}
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
    </div>
  )
}

export default Chat
