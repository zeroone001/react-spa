import React, {
    Component
} from 'react'
import {
    Table,
    Card
} from 'rctui'
import fetch from 'refetch';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                list: []
            }
        }
    }

    componentWillMount() {
        fetch.get('/authorlist.json').then((res) => {
            // 实际项目中，这里最好判断一下组件是否已经unmounted
            this.setState({
                data: res.data
            })
        })
    }
    render() {
        // 这里可以根据data的状态，返回其它内容，例如
        // if (!this.state.data) return <Loading />

        return (
            <Card>
                <Card.Header>作者列表</Card.Header>
                <Table
                  data={this.state.data.list}
                  columns={[
                    { name: 'id', header: 'ID' },
                    { name: 'name', header: '姓名' },
                    { name: 'nationality', header: '国籍' },
                    { name: 'birthday', header: '生日' },
                  ]}
                />
            </Card>
        )
    }


}

export default List