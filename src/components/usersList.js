import { useEffect,} from "react";
import { useSelector} from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import useThunk from "../hooks/use-thunk";
import UsersListItem from "./usersListItem";

function UsersList () {
   const [doFetchUsers, isLoadingUsers, isLoadingUsersError] = useThunk(fetchUsers);
   const [doAddUser, isCreatingUser, isCreatingUserError] = useThunk(addUser);

    const {data} = useSelector((state)=>{
        return state.users;
    });

    useEffect(()=>{
        doFetchUsers();
    }, [doFetchUsers]);

    const handleAddUser = () => {
        doAddUser();
    }

    let content;
    if( isLoadingUsers ) {
        content = <Skeleton times={10} className='h-10 w-full'/>
    }
    else if (isLoadingUsersError) {
        content = <div>ERRRROOOOOOOOOOOOOORRR</div>
    }
    else {
        content = data.map((user)=> {
            return <UsersListItem key={user.id} user={user}/>
        })
    }

    return <div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 text-xl">Users</h1>
            <Button onClick={handleAddUser} loading={isCreatingUser}>+ Add User</Button>
            {isCreatingUserError && 'Error creating user'}
        </div>
        {content}
    </div>
}
export default UsersList;