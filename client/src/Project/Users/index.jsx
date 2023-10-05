/* eslint-disable no-underscore-dangle */
import { ActionButton } from 'Project/UserCreate/Styles';
import React from 'react'
import { Avatar, ConfirmModal, PageError, PageLoader } from 'shared/components';
import useApi from 'shared/hooks/api';
import useCurrentUser from 'shared/hooks/currentUser';
import api from 'shared/utils/api';
import toast from 'shared/utils/toast';

function Users({ fetchProject }) {
  const [{ data, error }, fetchUsers] = useApi.get('/users');
  const { currentUser } = useCurrentUser();

  const handleDeleteUser = async (user, modal) => {
    try {
      await api.delete(`/users/${user._id}`);
      await fetchUsers();
      await fetchProject();
      if (modal && modal.close) {
        modal.close();
      }
    } catch (localError) {
      toast.error(localError);
    }
  }

  if (!data) return <PageLoader />;

  if (error) {
    return (
      <div>
        {error}
        <PageError />
      </div>
    )
  }

  return (
    <div>
      {data.map(user => (
        <div style={{display: 'flex', marginBottom: 10, justifyContent: 'space-between'}}>
          <div style={{display: 'flex'}}>
            <Avatar name={user.name} avatarUrl={user.avatarUrl} />
            <div style={{marginLeft: 10}}>
              <div>
                <b>Name: </b>
                <span>{user.name}</span>
              </div>
              <div>
                <b>Email: </b>
                <span>{user.email}</span>
              </div>
              <div>
                <b>IsAdmin: </b>
                <span>{user.isAdmin.toString()}</span>
              </div>
            </div>
          </div>
          <div>
            <ActionButton
              variant='primary'
            >
              Edit
            </ActionButton>
            {currentUser && currentUser.isAdmin && currentUser._id !== user._id && (
                <ConfirmModal 
                  title={`Are you sure you want to delete user ${user.name}?`}
                  message="Once you delete, it's gone for good."
                  confirmText={`Delete ${user.name}`}
                  onConfirm={(modal) => handleDeleteUser(user, modal)}
                  renderLink={modal => (
                    <ActionButton
                      variant='primary'
                      onClick={modal.open}
                    >
                      Delete
                    </ActionButton>
                  )}
                />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Users