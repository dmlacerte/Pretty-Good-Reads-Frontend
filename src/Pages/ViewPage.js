function ViewPage() {
    return (
        <>
            <div>
                <h1>View Page</h1>
                <img src="https://books.google.com/books/content?id=zaRoX10_UsMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70p4aEYWwkEjGAEdHjL0J2NK3sZQO8GN_Lt3End2TA6fTDWXcJ6qljQE4U63px1hz-hIDCaKBWKiKiN8CF8iZYrrtAPdLGGnrqEflQb2zclZW4c5dAvivjNeRt6xUk16TKJpmqb&source=gbs_api" />
                <form action="#">
                    <select name="languages" id="lang">
                        <option value="notRead">Not Read</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="reading">Reading</option>
                        <option value="haveRead">Have Read</option>
                    </select>
                    <input type="submit" value="Update" />
                </form>
                <p>Title</p>
                <p>Published Date</p>
                <p>Page Count</p>
                <p>Author</p>
                <p>A good book description is a detailed, descriptive copy that is good for public display, used for your book marketing, book discovery, and for sales purposes. It helps potential buyers find and understand your book. It's your pitch. Your chance to get people interested.</p>
                <p>My Rating</p>
            </div>
            <div>
                <h1>Community Ratings</h1>
            </div>
        </>
    )
}

export default ViewPage; 