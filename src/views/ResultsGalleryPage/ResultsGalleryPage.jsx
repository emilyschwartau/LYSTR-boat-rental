import React from 'react';
import { useDispatch } from 'react-redux';
import ResultsGalleryList from '../../components/ResultsGalleryList/ResultsGalleryList';
import useQuery from '../../hooks/useQuery';

function ResultsGalleryPage() {
  const dispatch = useDispatch();
  // useQuery pulls query string from url using query.get(<query string>)
  const query = useQuery();
  const location = query.get('location');
  const date = query.get('date');
  const type = query.get('type');

  const [searchQuery, setSearchQuery] = React.useState(null);

  React.useEffect(() => {
    dispatch({
      type: 'FETCH_VEHICLES',
      payload: {
        location: location,
        startDate: date,
        vehicleType: type,
      },
    });
  }, []);

  return (
    <>
      <ResultsGalleryList setSearchQuery={setSearchQuery} />
    </>
  );
}

export default ResultsGalleryPage;
