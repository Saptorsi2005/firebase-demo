import { useEffect, useState } from 'react'
import './App.css'
import Auth from './components/Auth'
import { db,auth } from './config/firebase'
import { getDocs,collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore'

function App() {
  const [movieList,setMovieList] = useState([]);

  //new movie states
  const [newMovieTitle,setNewMovieTitle] = useState("");
  const [newReleaseDate,setNewReleaseDate] = useState(0);
  const [isNewMovieOscar,setIsNewMovieOscar] = useState(true);

  //update title state
  const [updatedTtile,setUpdatedTitle] = useState("");


  const moviesCollectionRef = collection(db, "movies");

  async function deleteMovie(id){
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  }

  async function updateMovieTitle(id){
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {title : updatedTtile});
  }

  async function onSubmitMovie() {
    try{
    await addDoc(moviesCollectionRef, {
      title : newMovieTitle,
      releaseDate : newReleaseDate,
      receivedAnOscar: isNewMovieOscar,
      userId: auth?.currentUser?.uid,
    })
    getMovieList();
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    async function getMovieList(){
      //read the data
      //set the movie list
      try{
      const data=await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setMovieList(filteredData);
      } catch(err){
          console.error(err);
      }
    }
    getMovieList();
  }, [onSubmitMovie])


  return (
    <div className='App'>
      <Auth />

      <div>
        <input placeholder='Movie title...'
         onChange={(e) => setNewMovieTitle(e.target.value)}
         />
        <input placeholder='Release Date...' type='number'
         onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input type='checkbox'
        checked={isNewMovieOscar}
        onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit</button>
      </div>

      <div>
        {movieList.map((movie) =>(
          <div>
            <h1 style={{color: movie.receivedAnOscar ? "green" : "red"}}>
              {movie.title}
            </h1>
            <p>Date : {movie.releaseDate} </p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input placeholder='new title...'
            onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
