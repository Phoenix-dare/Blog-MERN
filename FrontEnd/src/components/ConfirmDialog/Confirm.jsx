
import React from 'react';

import DialogActions from '@material-ui/core/DialogActions';

import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

import DialogContentText from '@material-ui/core/DialogContentText';

import Dialog from '@material-ui/core/Dialog';

import Button from '@material-ui/core/Button';

const ConfirmDialog = props => {
	const { title, children, open, setOpen, onConfirm } = props;
	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="confirm-dialog"
		>
			<DialogTitle id="confirm-dialog">{title}</DialogTitle>
			<DialogContent>{children}</DialogContent>
<DialogActions>
			<Button color="primary" onClick={() => setOpen(false)}>No</Button>
			<Button color="secondary"
				onClick={() => {
					setOpen(false);
					onConfirm();
				}}
				color="default"
			>
				Yes
			</Button>
  </DialogActions>
    </Dialog>
    
	);
};
export default ConfirmDialog;
