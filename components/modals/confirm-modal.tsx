'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog'

interface ConfirmModalProps {
	children: React.ReactNode
	onConfirm: () => void
}

export function ConfirmModal({ children, onConfirm }: ConfirmModalProps) {
	const handleConfirm = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()
		onConfirm()
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger onClick={e => e.stopPropagation()} asChild>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Вы уверены?</AlertDialogTitle>
					<AlertDialogDescription>
						Это действие необратимо
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={e => e.stopPropagation()}>
						Отмена
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>
						Подтвердить
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
