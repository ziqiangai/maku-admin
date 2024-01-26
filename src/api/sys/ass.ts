import service from '@/utils/request'

export const useAssSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		if (dataForm.status == '3') {
			return service.put('/ass/check/reSubmit', dataForm)
		} else {
			return service.put('/ass/check', dataForm)
		}
	} else {
		return service.post('/ass/check', dataForm)
	}
}

export const addAttachment = (id: number, url: string) => {
	return service.post('/ass/check/attach/' + id, { approvalStatus: url })
}

export const updateStatus = (id: string, status: string) => {
	return service.get(`/ass/check/${id}/${status}`)
}
