/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from 'react-redux';
import { changeSearchField } from '../actions/actionCreators';
import { DataItem } from '../models';

interface SkillsState {
    skills: {
        items: DataItem[],
        loading: boolean,
        error: string | null,
        search: string,
    }
}

export default function Skills() {
    const { items, loading, error, search } = useSelector(
        (state: SkillsState) => state.skills
    );
    const dispatch = useDispatch();

    const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target;
        dispatch(changeSearchField(value) as any);
    }
    const hasQuery = search.trim() !== "";

    return (
        <main>
            <div>
                <input type='search' value={search} onChange={handleSearch} />
            </div>
            {!hasQuery && <div>Type something to search</div>}
            {hasQuery && loading && <div>Searching...</div>}
            {error ? (
                <div>Error occured</div>
            ) : (
                <ul className='search_list'>
                    {items.map((o: DataItem) => (
                        <li key={o.id}>{o.name}</li>
                    ))}
                </ul>
            )}
        </main>
    );
}
