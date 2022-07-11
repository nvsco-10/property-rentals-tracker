import { useAppContext } from '../context/appContext'

// Components
import { FormRow, FormRowSelect } from '.'

// Styles
import Wrapper from '../assets/wrappers/SearchContainer'

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    handleChange,
    clearFilters,
  } = useAppContext()

  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
  }

  return (
    <Wrapper>
      <form className='form'>
        <div className='form-center'>
          {/* search position */}
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='Filter'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['active', 'inactive', 'all', 'open', 'pending-lease', 'maintenance']}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer