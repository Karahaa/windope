   if (txs.length) {
            for (const tx of Object.values(txs)) {
                const date = new Date(timestampToDate(tx.created))
                uniqueDays.add(date.toDateString())
                uniqueWeeks.add(date.getFullYear() + '-' + date.getWeek())
                uniqueMonths.add(date.getFullYear() + '-' + date.getMonth())
                uniqueSource.add(tx.srcChainKey)
                uniqueDestination.add(tx.dstChainKey)
                uniqueContracts.add(tx.dstUaAddress)
                
                if (tx.srcUaProtocol) {
                    if (!protocols[tx.srcUaProtocol.id]) {
                        protocols[tx.srcUaProtocol.id] = 1
                    } else {
                        protocols[tx.srcUaProtocol.id]++
                    }

                    if (badProtocols.includes(tx.srcUaProtocol.id)) {
                        badProtocolsCount++
                    }
                }

                if (!sources[tx.srcChainKey]) {
                    sources[tx.srcChainKey] = 1
                } else {
                    sources[tx.srcChainKey]++
                }

                if (!destinations[tx.dstChainKey]) {
                    destinations[tx.dstChainKey] = 1
                } else {
                    destinations[tx.dstChainKey]++
                }
            }

            data.first_tx = new Date(timestampToDate(txs[txs.length - 1].created))
            data.last_tx = new Date(timestampToDate(txs[0].created))
            data.source_chain_count = uniqueSource.size
            data.dest_chain_count = uniqueDestination.size
            data.contracts = uniqueContracts.size
            data.days = uniqueDays.size
            data.weeks = uniqueWeeks.size
            data.months = uniqueMonths.size
            data.badProtocolsCount = badProtocolsCount
            data.sources = sources
            data.destinations = destinations
            data.protocols = protocols
        }
    }
