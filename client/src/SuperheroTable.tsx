import { Table } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CreateSuperheroResponseDTO } from './api/features/superhero/dto/superhero.response.dto';
import { GETSuperheroes } from './api/features/superhero/superhero.api';

export const SuperheroTable = ({ reload }: { reload: boolean }) => {
    const [tableData, setTableData] = useState<CreateSuperheroResponseDTO[]>(
        []
    );
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await GETSuperheroes();
                if (res.data) {
                    setTableData(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, [reload]);

    return (
        <Table.ScrollArea borderWidth='1px' rounded='md' height='max-content'>
            <Table.Root size='sm' stickyHeader>
                <Table.Header>
                    <Table.Row bg='bg.subtle'>
                        <Table.ColumnHeader>Superhero</Table.ColumnHeader>
                        <Table.ColumnHeader>Superpowers</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign='end'>
                            Humility Score
                        </Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {tableData.length === 0 && (
                        <Table.Row>
                            <Table.Cell colSpan={3} textAlign='center'>
                                No data available
                            </Table.Cell>
                        </Table.Row>
                    )}
                    {tableData?.map((hero) => (
                        <Table.Row key={hero.id}>
                            <Table.Cell fontWeight='bold'>
                                {hero.name}
                            </Table.Cell>
                            <Table.Cell>{hero.powers.join(',')}</Table.Cell>
                            <Table.Cell textAlign='end'>
                                {hero.humilityScore}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
    );
};
