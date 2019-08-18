import { Avatar, Button, Layout } from 'antd';
const AntHeader = Layout.Header;
import './index.scss';
function Header(props) {
	return (
		<AntHeader className="gin-unauth-header">
			<div className="left-bar">
				<div className="logo">
					<Button>My logo</Button>
				</div>
			</div>
		</AntHeader>
	);
}

export default Header;
