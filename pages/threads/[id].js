'use client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreadDetail } from '../../features/threads/threadDetailSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import CommentForm from '../../components/CommentForm';

dayjs.extend(relativeTime);

export default function ThreadDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const { item, status, error } = useSelector((s) => s.threadDetail);

  useEffect(() => {
    if (id) dispatch(fetchThreadDetail(id));
  }, [id, dispatch]);

  if (status === 'loading' || !item) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <article
      className="container"
      style={{ maxWidth: 800, margin: '0 auto', padding: '16px' }}
    >
      {/* Judul Thread */}
      <h2 style={{ marginBottom: '6px' }}>{item.title}</h2>

      {/* 🏷️ Kategori */}
      {item.category && (
        <span
          style={{
            display: 'inline-block',
            backgroundColor: '#e0f2fe',
            color: '#0369a1',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 500,
            marginBottom: '12px',
          }}
        >
          #{item.category}
        </span>
      )}

      {/* Info Pemilik Thread */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '12px',
          marginTop: '8px',
        }}
      >
        <img
          src={item.owner?.avatar}
          alt={item.owner?.name}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <div>
          <strong>{item.owner?.name}</strong>
          <div style={{ fontSize: '0.85rem', color: '#777' }}>
            {dayjs(item.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* Isi Thread */}
      <div
        style={{
          marginBottom: 16,
          padding: '12px 16px',
          backgroundColor: '#fafafa',
          borderRadius: 8,
        }}
        dangerouslySetInnerHTML={{ __html: item.body }}
      />

      {/* Komentar */}
      <h3 style={{ marginTop: '24px' }}>Komentar</h3>

      {item.comments?.length ? (
        <div style={{ marginTop: 12 }}>
          {item.comments.map((c) => (
            <div
              key={c.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '12px 0',
                borderBottom: '1px solid #eee',
              }}
            >
              <img
                src={c.owner?.avatar}
                alt={c.owner?.name}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <div style={{ flex: 1 }}>
                <p
                  style={{ margin: 0 }}
                  dangerouslySetInnerHTML={{ __html: c.content }}
                />
                <small style={{ color: '#777' }}>
                  {c.owner?.name} • {dayjs(c.createdAt).fromNow()}
                </small>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Belum ada komentar.</p>
      )}

      <CommentForm threadId={item.id} />
    </article>
  );
}
