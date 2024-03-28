import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import PhotosList from "./PhotosList";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store/apis/albumsApi";

function AlbumsListItem ({album}){
    const [removeAlbum, results] =useRemoveAlbumMutation();

    const handleRemoveAlbum = () =>{
        removeAlbum(album);
    }

    const header = <>
            <Button onClick={handleRemoveAlbum} loading={results.isLoading} className="mr-2">
                <GoTrashcan />
            </Button>
            {album.title}
        </>

    return <ExpandablePanel header={header} key={album.id}>
            <PhotosList album={album}/>
    </ExpandablePanel>
}
export default AlbumsListItem;