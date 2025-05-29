import { Layout } from 'antd'
import PatientList from './components/patients/PatientList'

const { Content } = Layout


function App() {
  return (
    <Layout style={{ minHeight: '100vh', width: '100%', maxWidth: '100%' }}>
      
      <Content style={{ padding: '24px', width: '100%' }}>
        <PatientList />
      </Content>
    </Layout>
  )
}

export default App
