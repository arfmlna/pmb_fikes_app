'use client'
export default function DarkMode() {
    function darkMode() {
        if (document.body.classList.contains('white-mode')) {
            document.body.classList.remove('white-mode')
            document.body.classList.add('dark-mode')
        } else {
            document.body.classList.remove('dark-mode')
            document.body.classList.add('white-mode')
        }
    }
    return (
    <>
        <button className="bg-cyan-600 rounded-bl-md rounded-br-md rounded-tr-md py-1 px-3" onClick={darkMode}>Switch</button>
    </>
  )
}
