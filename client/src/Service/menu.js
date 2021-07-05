export const getMuneDetailes = async()=>{
    let res = await fetch("http://localhost:5000/menu/" ,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    });

    let menu = await res.json();
    return menu;
    
}