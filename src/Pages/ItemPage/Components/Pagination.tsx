import Classes from './Pagination.module.css'
import {fetchItems, fetchItemsAWS} from "../../../axios/api";

interface pageinter{
    page:number,
    setPage:any,
    totalPage:number,
    setData:any
}
const Pagination:React.FC<pageinter> = ({page,setPage,totalPage,setData}):JSX.Element=>{
    const incrementPage = async ()=>{
        if(page+1>totalPage) return;
        const data1 = await fetchItems(page+1);
        setPage(page+1);
        setData(data1);
    }

    const decrementPage = async ()=>{
        if(page-1<0) return;
        const data1 = await fetchItems(page-1);
        setPage(page-1);
        setData(data1);
    }

    const handleClick = async (pageNumber:number)=>{
        const data1 = await fetchItemsAWS(pageNumber);
        setPage(pageNumber)
        setData(data1);
    }

    const options = ()=>{
        // 3bb92f
        const arr = []
        for (let i = 1; i <= totalPage ; i++) {
            // 58e3b6 ff9935
            arr.push(<a style={page==i?{backgroundColor:"#dd5f13",color:'white'}:{}} onClick={()=>{handleClick(i)}} href="#!">{i}</a>)
        }
        return arr
    }

    const disableStyle = {cursor:"none",opacity:0.6,backgroundColor:'#ddd'}

    return (
        <>
            <div className={Classes.body}>
                <div className={Classes.pagination}>
                    <a style={page==1?disableStyle:{}} href="#!" onClick={decrementPage}>&laquo;</a>
                    {options()}
                    <a style={page===10?disableStyle:{}} href="#!" onClick={incrementPage}>&raquo;</a>
                </div>
            </div>
        </>
    )
}

export default Pagination