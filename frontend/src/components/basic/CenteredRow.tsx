import {Col, Row} from "react-bootstrap";
import {ReactNode} from "react";
import {AsProp} from "react-bootstrap/helpers";

export interface CenteredRowProps {
	children?: ReactNode,
	className?: string
}

export const CenteredRow = ({as, children, className}: CenteredRowProps & AsProp) => {
	return (
		<Row as={as} className={`${className} justify-content-center`}>
			<Col lg={10}>
				{ children }
			</Col>
		</Row>
	)
}