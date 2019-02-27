// read automatically by react-scripts.
// this is needed to setup enzyme.

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
