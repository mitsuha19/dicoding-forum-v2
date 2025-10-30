import React from 'react';
import Link from 'next/link';
import DOMPurify from 'dompurify';

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = (now - date) / 1000;

  if (diff < 60) return `${Math.floor(diff)} detik yang lalu`;
  if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} hari yang lalu`;
  return `${Math.floor(diff / 2592000)} bulan yang lalu`;
}

export default function ThreadItem({ thread }) {
  return (
    <article
      className="thread-item"
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        background: '#fff',
        transition: '0.2s',
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)')
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
    >
      <h3 style={{ marginBottom: '6px' }}>
        <Link
          href={`/threads/${thread.id}`}
          style={{ color: '#1e3a8a', textDecoration: 'none' }}
        >
          {thread.title}
        </Link>
      </h3>

      {thread.category && (
        <span
          style={{
            display: 'inline-block',
            backgroundColor: '#e0f2fe',
            color: '#0369a1',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 500,
            marginBottom: '8px',
          }}
        >
          #{thread.category}
        </span>
      )}

      <p
        style={{ marginBottom: '8px', color: '#374151' }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(thread.body.replace(/(&nbsp;|\s)+/g, ' ')),
        }}
      />

      <small style={{ color: '#6b7280', fontSize: '0.9rem' }}>
        Dibuat oleh <strong>{thread.owner?.name || 'Anonim'}</strong> •{' '}
        {timeAgo(thread.createdAt)} • {thread.totalComments ?? 0} komentar
      </small>
    </article>
  );
}
