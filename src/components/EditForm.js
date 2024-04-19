export const EditForm = (props) =>{
    const { onSubmit,
        onInputChange,
        title,
        status,
        onSelectChange,
        detail,
        onTextChange } = props
    return (
        <div className='todo-form'>
            <h2>Edit</h2>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='タイトル'
                    onChange={onInputChange}
                    value={title}
                />
                <select value={status} onChange={onSelectChange}>
                    <option value='未着手'>未着手</option>
                    <option value='進行中'>進行中</option>
                    <option value='完了'>完了</option>
                </select>
                <textarea
                    rows={3}
                    placeholder='詳細'
                    value={detail}
                    onChange={onTextChange}
                />
                <button type='submit'>OK</button>
            </form>
        </div>
    )
}