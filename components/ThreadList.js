import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreads } from '../features/threads/threadsSlice';
import { fetchUsers } from '../features/users/usersSlice';
import ThreadItem from './ThreadItem';
import Loading from './Loading';

export default function ThreadList() {
  const dispatch = useDispatch();
  const { items: threads, status: threadsStatus } = useSelector(
    (s) => s.threads
  );
  const { items: users, status: usersStatus } = useSelector((s) => s.users);

  useEffect(() => {
    if (threadsStatus === 'idle') dispatch(fetchThreads());
    if (usersStatus === 'idle') dispatch(fetchUsers());
  }, [dispatch, threadsStatus, usersStatus]);

  if (threadsStatus === 'loading' || usersStatus === 'loading')
    return <Loading />;

  const threadsWithOwner = threads.map((t) => ({
    ...t,
    owner: users.find((u) => u.id === t.ownerId),
  }));

  return (
    <section>
      {threadsWithOwner.length === 0 ? (
        <p>Tidak ada thread.</p>
      ) : (
        threadsWithOwner.map((t) => <ThreadItem key={t.id} thread={t} />)
      )}
    </section>
  );
}
