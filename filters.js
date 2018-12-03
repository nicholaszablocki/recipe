const filter = {
  searchText:''
};

const getFilter = ()=> filter;

const setFilter = (update)=>{
  filter.searchText = update
};

export {getFilter, setFilter}
