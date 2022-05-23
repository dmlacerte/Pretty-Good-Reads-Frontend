import UserLists from '../Components/UserLists.js';

function MainPage() {
    return (
        <>
            <div>
                <h2>What Are You Reading Today?</h2>
                <form action="/search" method="GET">
                    <input type="text" id="title" name="title" placeholder="Title"/>
                    <input type="text" id="author" name="author" placeholder="Author"/>
                    <input type="text" id="genre" name="genre" placeholder="Genre"/>
                    <button type="submit" name="submit" value="Search">Search For a New Book</button>
                </form>
                <p>OR</p>
                <form>
                    <button type="submit">Select Random from TBR</button>
                </form>
            </div>
        </>
    )
}

export default MainPage;