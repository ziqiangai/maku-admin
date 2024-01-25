import service from '@/utils/request'

export const useAssSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/ass/check', dataForm)
	} else {
		return service.post('/ass/check', dataForm)
	}
}
