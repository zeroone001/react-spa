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
}