import { Alert, Button, Heading, HStack, Input, Stack } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IoHeart, IoTrash } from 'react-icons/io5';
import { SuperheroFormDTO } from './api/features/superhero/dto/superhero.request.dto';
import { POSTCreateSuperhero } from './api/features/superhero/superhero.api';
import './App.css';
import { Field } from './components/ui/field';
import { InputGroup } from './components/ui/input-group';
import { Rating } from './components/ui/rating';
import { SuperheroTable } from './SuperheroTable';

interface SuperheroErrorForm {
    name: string;
    humilityScore: string;
    powers: string;
}

interface FormState {
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
}

function ErrorAlert({ message }: { message: string }) {
    return (
        <Alert.Root status='error'>
            <Alert.Indicator />
            <Alert.Title>{message}</Alert.Title>
        </Alert.Root>
    );
}

function App() {
    const [superheroName, setSuperheroName] = useState('');
    const [superPowers, setSuperPowers] = useState<string[]>([]);
    const [powerInput, setPowerInput] = useState('');
    const [humilityScore, setHumilityScore] = useState(0);
    const [formState, setFormState] = useState<FormState>({
        isSubmitting: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    });
    const [errorForm, setErrorForm] = useState<SuperheroErrorForm>({
        name: '',
        humilityScore: '',
        powers: '',
    });

    const [reloadTable, setReloadTable] = useState(false);

    useEffect(() => {
        if (formState.errorMessage) {
            console.log('Updated error message:', formState.errorMessage);
        }
    }, [formState.errorMessage]);

    const onChangeSuperheroName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, isError: false });
        setSuperheroName(e.target.value);
        setErrorForm({ ...errorForm, name: '' });
    };

    const onChangeHumilityScore = (e: { value: number }) => {
        setFormState({ ...formState, isError: false });
        setHumilityScore(e.value);
        setErrorForm({ ...errorForm, humilityScore: '' });
    };

    const onAddPower = () => {
        if (powerInput.trim() !== '') {
            setFormState({ ...formState, isError: false });
            setSuperPowers([...superPowers, powerInput]);
            setPowerInput('');
            setErrorForm({ ...errorForm, powers: '' });
        }
    };

    const onDeletePower = (index: number) => {
        const updatedPowers = superPowers.filter((_, i) => i !== index);
        setSuperPowers(updatedPowers);
    };

    const resetForm = () => {
        setReloadTable((prev) => !prev);
        setSuperheroName('');
        setSuperPowers([]);
        setPowerInput('');
        setHumilityScore(0);
        setErrorForm({ name: '', humilityScore: '', powers: '' });
        setFormState({ ...formState, isError: false });
    };

    const isFormValid = () => {
        let isValid = true;
        
        if (humilityScore === 0) {
            setErrorForm({
                ...errorForm,
                humilityScore: 'Humility score is required',
            });
            isValid = false;
        }
        
        if (superPowers.length === 0) {
            setErrorForm({
                ...errorForm,
                powers: 'Superpowers are required',
            });
            isValid = false;
        }

        if (superheroName === '') {
            setErrorForm({
                ...errorForm,
                name: 'Superhero name is required',
            });
            isValid = false;
        }
        

        return isValid;
    };

    const onSubmitForm = async () => {
        if (!formState.isError && isFormValid()) {
            try {
                const payload: SuperheroFormDTO = {
                    name: superheroName,
                    humilityScore,
                    powers: superPowers,
                };

                setFormState({ ...formState, isSubmitting: true });
                await POSTCreateSuperhero(payload);
                resetForm();
            } catch (error) {
                if (error instanceof AxiosError) {
                    setFormState({
                        ...formState,
                        isError: true,
                        errorMessage: error.message,
                    });
                }
            } finally {
                setFormState({ ...formState, isSubmitting: false });
            }
        }
    };

    return (
        <Stack gap='4'>
            <Heading>Create Your New Superhero Character</Heading>
            {formState.errorMessage !== '' && (
                <ErrorAlert message={formState.errorMessage} />
            )}
            <Field
                label='Your Superhero Name'
                required
                errorText={errorForm.name}
                invalid={errorForm.name !== ''}
                helperText="Choose a name that's unique to you and what you want to be known as."
            >
                <Input
                    placeholder='Enter your superhero name'
                    value={superheroName}
                    onChange={(e) => onChangeSuperheroName(e)}
                />
            </Field>
            <Field
                label='Your Superpowers'
                required
                invalid={errorForm.powers !== ''}
                errorText={errorForm.powers}
                helperText='List your superpowers. You can add more later.'
            >
                <HStack gap='10' width='full'>
                    <InputGroup flex='1'>
                        <Input
                            placeholder='Enter a superpower'
                            value={powerInput}
                            onChange={(e) => setPowerInput(e.target.value)}
                        />
                    </InputGroup>
                    <Button
                        variant='surface'
                        colorPalette='blue'
                        onClick={onAddPower}
                    >
                        Add
                    </Button>
                </HStack>
                {superPowers.length > 0 && (
                    <>
                        {superPowers.map((power, index) => (
                            <HStack width='full' key={index} gap='12'>
                                <Input
                                    variant='subtle'
                                    disabled
                                    key={index}
                                    value={power}
                                />
                                <Button
                                    colorPalette='red'
                                    onClick={() => onDeletePower(index)}
                                    variant='surface'
                                >
                                    <IoTrash size={10} />
                                </Button>
                            </HStack>
                        ))}
                    </>
                )}
            </Field>

            <Field
                label='Your Humility Score'
                required
                helperText='On a scale of 1 to 10, how humble are you?'
                errorText={errorForm.humilityScore}
                invalid={errorForm.humilityScore !== ''}
            >
                <Rating
                    colorPalette='red'
                    value={humilityScore}
                    onValueChange={(e) => onChangeHumilityScore(e)}
                    count={10}
                    icon={<IoHeart />}
                />
            </Field>
            <Button
                variant='surface'
                colorPalette='green'
                onClick={onSubmitForm}
                loading={formState.isSubmitting}
            >
                Submit
            </Button>

            <SuperheroTable reload={reloadTable} />
        </Stack>
    );
}

export default App;
