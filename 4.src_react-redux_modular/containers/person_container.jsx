import Person from '../components/person'
import {connect} from 'react-redux'
import {createAddPersonAction} from '../redux/actions/person-action-creators'

export default connect(
    state=>({
        persons:state.persons,
        he:state.count
    }),
    {
        add:createAddPersonAction
    }
)(Person)