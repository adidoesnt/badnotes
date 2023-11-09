import neo4j, { Driver, Record, Session } from 'neo4j-driver'

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env

class Neo4j {
    private static instance: Neo4j
    driver: Driver

    private constructor() {
        this.driver = neo4j.driver(
            `bolt://${DB_HOST}:${DB_PORT}`,
            neo4j.auth.basic(`${DB_USERNAME}`, `${DB_PASSWORD}`)
        )
    }

    public static getInstance() {
        if (!this.instance) {
            Neo4j.instance = new Neo4j()
        }
        return Neo4j.instance
    }

    public async runQuery(query: string, resultVar?: string) {
        const session: Session = this.driver.session()
        const transaction = session.beginTransaction()
        try {
            const result = await transaction.run(query)
            const records: Array<Record> = []
            result.records.forEach((record) => {
                const value = record.get(resultVar ?? 'result')
                if (Array.isArray(value)) {
                    value.forEach((sub: { properties: Record }) =>
                        records.push(sub.properties)
                    )
                } else {
                    records.push(value.properties)
                }
            })
            await transaction.commit()
            return records
        } catch (error) {
            await transaction.rollback()
        }
        session.close()
    }
}

export const database = Neo4j.getInstance()
