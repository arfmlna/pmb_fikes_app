const tgl = (tgl) => {
    const date = new Date(tgl);
    
    // Format lokal Indonesia: 27 April 2003
    const formatted = date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    return formatted
} 

export default tgl
