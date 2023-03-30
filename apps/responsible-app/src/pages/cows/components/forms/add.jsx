import React, { useState, useContext } from 'react'

import PropTypes from 'prop-types'
import { Button, HStack, Text } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Select, Input } from '@components/forms/fields/_index'
import { Store } from '@store/context'
import { CreateCow } from '@services/http-client'

const initialValues = { breed: '', entryDate: '' }
const validationSchema = yup.object().shape({
    breed: yup.string().oneOf(['holstein', 'montbliard'], 'Invalid option selected').required('breed is required'),
    entryDate: yup.date().required('entry Date is required')
})

export default function AddCow ({ onClose }) {
    const [error, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [state, dispatch] = useContext(Store)
    const handelSubmit = async (values) => {
        console.log('values: ', values)
        try {
            setLoading(true)
            const { data } = await CreateCow(state.auth.accessToken, values)
            console.log('data: ', data)
            dispatch({ type: 'SET_COW', payload: data.cow })
            onClose()
        } catch (error) {
            setError('Error when try to create cow')
            console.log('http error: ', error.response)
        } finally {
            console.log('state: ', state)
            setLoading(false)
        }
    }
    return (
        <>
            {
                error && <Text textAlign={'center'} textTransform={'capitalize'} py={3} px={2} color='red.500' rounded='sm' bg={'red.50'} mb='4'>{error}</Text>
            }
            <FormCustom
                initialValues={initialValues}
                validationSchema={validationSchema}
                handelSubmit={handelSubmit}
            >
                {
                    () => {
                        return (
                            <Form>
                                <Select label="Cow Breed" name="breed">
                                    <option value="" selected disabled>Select Cow Breed</option>
                                    <option value="holstein">Holstein</option>
                                    <option value="montbliard">Montbliard</option>
                                </Select>
                                <Input label="Entry Date" name="entryDate" type="date" />
                                <HStack justifyContent="flex-end" mt="2">
                                    <Button px="5" rounded="sm" colorScheme="brand" variant="outline" fontWeight="medium" onClick={onClose}>Close</Button>
                                    <Button type="submit" rounded="sm" color='white' bg="brand.900" colorScheme="brand" isLoading={isLoading}>Submit</Button>
                                </HStack>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}

AddCow.propTypes = {
    onClose: PropTypes.func.isRequired
}
