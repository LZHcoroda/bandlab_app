const SORT_CONFIG = {
    DEFAULT: "default",
    ALPHABETICAL: "alphabetical"
}

const GROUP_CONFIG = {
    DEFAULT: "default",
    USERID: "user id"
}

function PostPage() {
    const [post, setPost] = React.useState(null);
    const [sort, setSort] = React.useState(SORT_CONFIG.DEFAULT);
    const [group, setGroup] = React.useState(GROUP_CONFIG.DEFAULT);

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setPost(data);
            });
    }, []);

    let sortedAlpha = [];
    let sortedByUserId = {};

    if (post != null) {
        sortedAlpha = ([...post].sort((a, b) => a.title.localeCompare(b.title)))

        post.forEach((post) => {
            if (sortedByUserId[post.userId]) {
                sortedByUserId[post.userId].push(post);
            } else {
                sortedByUserId[post.userId] = [post];
            }
        });
    }

    const handleSort = (option) => {
        setSort(option)
    }

    const handleGroup = (option) => {
        setGroup(option)
    }

    return (
        <>
            <div className='site-header'>
                <a href='page2.html' className='header-nav_right'>
                    Cool Audio &gt;
                </a>
                POST
            </div>
            <div className='body-description'>
                The page where posts exist from somwhere.
            </div>
            <div className='site-body-page1'>
                <div className='body-table-wrapper'>
                {post && group === 'default' &&
                    <table className='body-table'>
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sort === SORT_CONFIG.DEFAULT && post.map((post, index) => (
                                <tr key={index}>
                                    <td>{post.userId}</td>
                                    <td>{post.title}</td>
                                </tr>
                            ))}
                            {sort === SORT_CONFIG.ALPHABETICAL && sortedAlpha.map((post, index) => (
                                <tr key={index}>
                                    <td>{post.userId}</td>
                                    <td>{post.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {post && group === GROUP_CONFIG.USERID &&  Object.keys(sortedByUserId).map((userId) => {
                    const userPosts = sortedByUserId[userId]
                    return (
                    <table className='body-table' key={userId}>
                        <thead>
                            <tr>
                                <th>Posts created by user {userId}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sort === SORT_CONFIG.DEFAULT && userPosts.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.title}</td>
                                </tr>
                            ))}
                            {sort === SORT_CONFIG.ALPHABETICAL && userPosts.sort((a, b) => a.title.localeCompare(b.title)).map((post) => (
                                <tr key={post.id}>
                                    <td>{post.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )})}

                </div>
                <div className='body-sort-wrapper'>
                    <div className='body-sort'>
                        Active filter:
                            <dl>
                                {sort === SORT_CONFIG.ALPHABETICAL && <dd>sorting: {sort}</dd> }
                                {group === GROUP_CONFIG.USERID && <dd>grouping by: {group}</dd>}
                            </dl>
                        Sort by:
                        <ul>
                            <li onClick={() => handleSort(SORT_CONFIG.DEFAULT)}>Default</li>
                            <li onClick={() => handleSort(SORT_CONFIG.ALPHABETICAL)}>Title</li>               
                        </ul>
                        Group by:
                        <ul>
                            <li onClick={() => handleGroup(GROUP_CONFIG.DEFAULT)}>Default</li>
                            <li onClick={() => handleGroup(GROUP_CONFIG.USERID)}>User Id</li>            
                        </ul>
                    </div> 
                </div>
            </div>
        </>
    )
}

const domContainer = document.querySelector('#page1');
const root = ReactDOM.createRoot(domContainer);
root.render(<PostPage/>);