import React from 'react';
import ReactDOM from 'react-dom';
import Documentation from "@open-rpc/docs-react";
import { OpenrpcDocument } from '@open-rpc/meta-schema';

const schema: OpenrpcDocument = {
  "components": {
    "schemas": {
      "Account": {
        "additionalProperties": false,
        "description": "Structure representing a user's account, stored in global state.",
        "properties": {
          "account_hash": {
            "$ref": "#/components/schemas/AccountHash"
          },
          "action_thresholds": {
            "$ref": "#/components/schemas/ActionThresholds"
          },
          "associated_keys": {
            "items": {
              "$ref": "#/components/schemas/AssociatedKey"
            },
            "type": "array"
          },
          "main_purse": {
            "$ref": "#/components/schemas/URef"
          },
          "named_keys": {
            "items": {
              "$ref": "#/components/schemas/NamedKey"
            },
            "type": "array"
          }
        },
        "required": [
          "account_hash",
          "action_thresholds",
          "associated_keys",
          "main_purse",
          "named_keys"
        ],
        "type": "object"
      },
      "AccountHash": {
        "description": "Hex-encoded account hash.",
        "type": "string"
      },
      "ActionThresholds": {
        "additionalProperties": false,
        "description": "Thresholds that have to be met when executing an action of a certain type.",
        "properties": {
          "deployment": {
            "format": "uint8",
            "minimum": 0.0,
            "type": "integer"
          },
          "key_management": {
            "format": "uint8",
            "minimum": 0.0,
            "type": "integer"
          }
        },
        "required": [
          "deployment",
          "key_management"
        ],
        "type": "object"
      },
      "ActivationPoint": {
        "anyOf": [
          {
            "$ref": "#/components/schemas/EraId"
          },
          {
            "$ref": "#/components/schemas/Timestamp"
          }
        ],
        "description": "The first era to which the associated protocol version applies."
      },
      "Approval": {
        "additionalProperties": false,
        "description": "A struct containing a signature and the public key of the signer.",
        "properties": {
          "signature": {
            "$ref": "#/components/schemas/Signature"
          },
          "signer": {
            "$ref": "#/components/schemas/PublicKey"
          }
        },
        "required": [
          "signature",
          "signer"
        ],
        "type": "object"
      },
      "AssociatedKey": {
        "additionalProperties": false,
        "properties": {
          "account_hash": {
            "$ref": "#/components/schemas/AccountHash"
          },
          "weight": {
            "format": "uint8",
            "minimum": 0.0,
            "type": "integer"
          }
        },
        "required": [
          "account_hash",
          "weight"
        ],
        "type": "object"
      },
      "AuctionState": {
        "additionalProperties": false,
        "description": "Data structure summarizing auction contract data.",
        "properties": {
          "bids": {
            "description": "All bids contained within a vector.",
            "items": {
              "$ref": "#/components/schemas/JsonBids"
            },
            "type": "array"
          },
          "block_height": {
            "description": "Block height.",
            "format": "uint64",
            "minimum": 0.0,
            "type": "integer"
          },
          "era_validators": {
            "description": "Era validators.",
            "items": {
              "$ref": "#/components/schemas/JsonEraValidators"
            },
            "type": "array"
          },
          "state_root_hash": {
            "allOf": [
              {
                "$ref": "#/components/schemas/Digest"
              }
            ],
            "description": "Global state hash."
          }
        },
        "required": [
          "bids",
          "block_height",
          "era_validators",
          "state_root_hash"
        ],
        "type": "object"
      },
      "Bid": {
        "additionalProperties": false,
        "description": "An entry in the validator map.",
        "properties": {
          "bonding_purse": {
            "allOf": [
              {
                "$ref": "#/components/schemas/URef"
              }
            ],
            "description": "The purse that was used for bonding."
          },
          "delegation_rate": {
            "description": "Delegation rate",
            "format": "uint8",
            "minimum": 0.0,
            "type": "integer"
          },
          "delegators": {
            "additionalProperties": {
              "$ref": "#/components/schemas/Delegator"
            },
            "description": "This validator's delegators, indexed by their public keys",
            "type": "object"
          },
          "inactive": {
            "description": "`true` if validator has been \"evicted\"",
            "type": "boolean"
          },
          "staked_amount": {
            "allOf": [
              {
                "$ref": "#/components/schemas/U512"
              }
            ],
            "description": "The amount of tokens staked by a validator (not including delegators)."
          },
          "validator_public_key": {
            "allOf": [
              {
                "$ref": "#/components/schemas/PublicKey"
              }
            ],
            "description": "Validator public key"
          },
          "vesting_schedule": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/VestingSchedule"
              },
              {
                "type": "null"
              }
            ],
            "description": "Vesting schedule for a genesis validator. `None` if non-genesis validator."
          }
        },
        "required": [
          "bonding_purse",
          "delegation_rate",
          "delegators",
          "inactive",
          "staked_amount",
          "validator_public_key"
        ],
        "type": "object"
      },
      "BlockHash": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Digest"
          }
        ],
        "description": "A cryptographic hash identifying a [`Block`](struct.Block.html)."
      },
      "BlockIdentifier": {
        "anyOf": [
          {
            "additionalProperties": false,
            "description": "Identify and retrieve the block with its hash.",
            "properties": {
              "Hash": {
                "$ref": "#/components/schemas/BlockHash"
              }
            },
            "required": [
              "Hash"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Identify and retrieve the block with its height.",
            "properties": {
              "Height": {
                "format": "uint64",
                "minimum": 0.0,
                "type": "integer"
              }
            },
            "required": [
              "Height"
            ],
            "type": "object"
          }
        ],
        "description": "Identifier for possible ways to retrieve a block."
      },
      "CLType": {
        "anyOf": [
          {
            "enum": [
              "Bool",
              "I32",
              "I64",
              "U8",
              "U32",
              "U64",
              "U128",
              "U256",
              "U512",
              "Unit",
              "String",
              "Key",
              "URef",
              "PublicKey",
              "Any"
            ],
            "type": "string"
          },
          {
            "additionalProperties": false,
            "description": "`Option` of a `CLType`.",
            "properties": {
              "Option": {
                "$ref": "#/components/schemas/CLType"
              }
            },
            "required": [
              "Option"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Variable-length list of a single `CLType` (comparable to a `Vec`).",
            "properties": {
              "List": {
                "$ref": "#/components/schemas/CLType"
              }
            },
            "required": [
              "List"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Fixed-length list of a single `CLType` (comparable to a Rust array).",
            "properties": {
              "ByteArray": {
                "format": "uint32",
                "minimum": 0.0,
                "type": "integer"
              }
            },
            "required": [
              "ByteArray"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "`Result` with `Ok` and `Err` variants of `CLType`s.",
            "properties": {
              "Result": {
                "additionalProperties": false,
                "properties": {
                  "err": {
                    "$ref": "#/components/schemas/CLType"
                  },
                  "ok": {
                    "$ref": "#/components/schemas/CLType"
                  }
                },
                "required": [
                  "err",
                  "ok"
                ],
                "type": "object"
              }
            },
            "required": [
              "Result"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Map with keys of a single `CLType` and values of a single `CLType`.",
            "properties": {
              "Map": {
                "additionalProperties": false,
                "properties": {
                  "key": {
                    "$ref": "#/components/schemas/CLType"
                  },
                  "value": {
                    "$ref": "#/components/schemas/CLType"
                  }
                },
                "required": [
                  "key",
                  "value"
                ],
                "type": "object"
              }
            },
            "required": [
              "Map"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "1-ary tuple of a `CLType`.",
            "properties": {
              "Tuple1": {
                "items": {
                  "$ref": "#/components/schemas/CLType"
                },
                "maxItems": 1,
                "minItems": 1,
                "type": "array"
              }
            },
            "required": [
              "Tuple1"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "2-ary tuple of `CLType`s.",
            "properties": {
              "Tuple2": {
                "items": {
                  "$ref": "#/components/schemas/CLType"
                },
                "maxItems": 2,
                "minItems": 2,
                "type": "array"
              }
            },
            "required": [
              "Tuple2"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "3-ary tuple of `CLType`s.",
            "properties": {
              "Tuple3": {
                "items": {
                  "$ref": "#/components/schemas/CLType"
                },
                "maxItems": 3,
                "minItems": 3,
                "type": "array"
              }
            },
            "required": [
              "Tuple3"
            ],
            "type": "object"
          }
        ],
        "description": "166 chars"
      },
      "CLValue": {
        "additionalProperties": false,
        "description": "389 chars",
        "properties": {
          "bytes": {
            "type": "string"
          },
          "cl_type": {
            "$ref": "#/components/schemas/CLType"
          },
          "parsed": true
        },
        "required": [
          "bytes",
          "cl_type"
        ],
        "type": "object"
      },
      "Contract": {
        "additionalProperties": false,
        "description": "A contract struct that can be serialized as  JSON object.",
        "properties": {
          "contract_package_hash": {
            "$ref": "#/components/schemas/ContractPackageHash"
          },
          "contract_wasm_hash": {
            "$ref": "#/components/schemas/ContractWasmHash"
          },
          "entry_points": {
            "items": {
              "$ref": "#/components/schemas/EntryPoint"
            },
            "type": "array"
          },
          "named_keys": {
            "items": {
              "$ref": "#/components/schemas/NamedKey"
            },
            "type": "array"
          },
          "protocol_version": {
            "type": "string"
          }
        },
        "required": [
          "contract_package_hash",
          "contract_wasm_hash",
          "entry_points",
          "named_keys",
          "protocol_version"
        ],
        "type": "object"
      },
      "ContractHash": {
        "description": "The hash address of the contract",
        "type": "string"
      },
      "ContractPackage": {
        "additionalProperties": false,
        "description": "Contract definition, metadata, and security container.",
        "properties": {
          "access_key": {
            "$ref": "#/components/schemas/URef"
          },
          "disabled_versions": {
            "items": {
              "$ref": "#/components/schemas/DisabledVersion"
            },
            "type": "array"
          },
          "groups": {
            "items": {
              "$ref": "#/components/schemas/Groups"
            },
            "type": "array"
          },
          "versions": {
            "items": {
              "$ref": "#/components/schemas/ContractVersion"
            },
            "type": "array"
          }
        },
        "required": [
          "access_key",
          "disabled_versions",
          "groups",
          "versions"
        ],
        "type": "object"
      },
      "ContractPackageHash": {
        "description": "The hash address of the contract package",
        "type": "string"
      },
      "ContractVersion": {
        "properties": {
          "contract_hash": {
            "$ref": "#/components/schemas/ContractHash"
          },
          "contract_version": {
            "format": "uint32",
            "minimum": 0.0,
            "type": "integer"
          },
          "protocol_version_major": {
            "format": "uint32",
            "minimum": 0.0,
            "type": "integer"
          }
        },
        "required": [
          "contract_hash",
          "contract_version",
          "protocol_version_major"
        ],
        "type": "object"
      },
      "ContractWasmHash": {
        "description": "The hash address of the contract wasm",
        "type": "string"
      },
      "Delegator": {
        "additionalProperties": false,
        "description": "Represents a party delegating their stake to a validator (or \"delegatee\")",
        "properties": {
          "bonding_purse": {
            "$ref": "#/components/schemas/URef"
          },
          "delegator_public_key": {
            "$ref": "#/components/schemas/PublicKey"
          },
          "staked_amount": {
            "$ref": "#/components/schemas/U512"
          },
          "validator_public_key": {
            "$ref": "#/components/schemas/PublicKey"
          },
          "vesting_schedule": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/VestingSchedule"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "required": [
          "bonding_purse",
          "delegator_public_key",
          "staked_amount",
          "validator_public_key"
        ],
        "type": "object"
      },
      "Deploy": {
        "additionalProperties": false,
        "description": "A deploy; an item containing a smart contract along with the requester's signature(s).",
        "properties": {
          "approvals": {
            "items": {
              "$ref": "#/components/schemas/Approval"
            },
            "type": "array"
          },
          "hash": {
            "$ref": "#/components/schemas/DeployHash"
          },
          "header": {
            "$ref": "#/components/schemas/DeployHeader"
          },
          "payment": {
            "$ref": "#/components/schemas/ExecutableDeployItem"
          },
          "session": {
            "$ref": "#/components/schemas/ExecutableDeployItem"
          }
        },
        "required": [
          "approvals",
          "hash",
          "header",
          "payment",
          "session"
        ],
        "type": "object"
      },
      "DeployHash": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Digest"
          }
        ],
        "description": "Hex-encoded deploy hash."
      },
      "DeployHeader": {
        "additionalProperties": false,
        "description": "The header portion of a [`Deploy`](struct.Deploy.html).",
        "properties": {
          "account": {
            "$ref": "#/components/schemas/PublicKey"
          },
          "body_hash": {
            "$ref": "#/components/schemas/Digest"
          },
          "chain_name": {
            "type": "string"
          },
          "dependencies": {
            "items": {
              "$ref": "#/components/schemas/DeployHash"
            },
            "type": "array"
          },
          "gas_price": {
            "format": "uint64",
            "minimum": 0.0,
            "type": "integer"
          },
          "timestamp": {
            "$ref": "#/components/schemas/Timestamp"
          },
          "ttl": {
            "$ref": "#/components/schemas/TimeDiff"
          }
        },
        "required": [
          "account",
          "body_hash",
          "chain_name",
          "dependencies",
          "gas_price",
          "timestamp",
          "ttl"
        ],
        "type": "object"
      },
      "DeployInfo": {
        "additionalProperties": false,
        "description": "Information relating to the given Deploy.",
        "properties": {
          "deploy_hash": {
            "allOf": [
              {
                "$ref": "#/components/schemas/DeployHash"
              }
            ],
            "description": "The relevant Deploy."
          },
          "from": {
            "allOf": [
              {
                "$ref": "#/components/schemas/AccountHash"
              }
            ],
            "description": "Account identifier of the creator of the Deploy."
          },
          "gas": {
            "allOf": [
              {
                "$ref": "#/components/schemas/U512"
              }
            ],
            "description": "Gas cost of executing the Deploy."
          },
          "source": {
            "allOf": [
              {
                "$ref": "#/components/schemas/URef"
              }
            ],
            "description": "Source purse used for payment of the Deploy."
          },
          "transfers": {
            "description": "Transfers performed by the Deploy.",
            "items": {
              "$ref": "#/components/schemas/TransferAddr"
            },
            "type": "array"
          }
        },
        "required": [
          "deploy_hash",
          "from",
          "gas",
          "source",
          "transfers"
        ],
        "type": "object"
      },
      "Digest": {
        "description": "Hex-encoded hash digest.",
        "type": "string"
      },
      "DisabledVersion": {
        "properties": {
          "contract_version": {
            "format": "uint32",
            "minimum": 0.0,
            "type": "integer"
          },
          "protocol_version_major": {
            "format": "uint32",
            "minimum": 0.0,
            "type": "integer"
          }
        },
        "required": [
          "contract_version",
          "protocol_version_major"
        ],
        "type": "object"
      },
      "EntryPoint": {
        "description": "103 chars",
        "properties": {
          "access": {
            "$ref": "#/components/schemas/EntryPointAccess"
          },
          "args": {
            "items": {
              "$ref": "#/components/schemas/Parameter"
            },
            "type": "array"
          },
          "entry_point_type": {
            "$ref": "#/components/schemas/EntryPointType"
          },
          "name": {
            "type": "string"
          },
          "ret": {
            "$ref": "#/components/schemas/CLType"
          }
        },
        "required": [
          "access",
          "args",
          "entry_point_type",
          "name",
          "ret"
        ],
        "type": "object"
      },
      "EntryPointAccess": {
        "anyOf": [
          {
            "enum": [
              "Public"
            ],
            "type": "string"
          },
          {
            "additionalProperties": false,
            "description": "142 chars",
            "properties": {
              "Groups": {
                "items": {
                  "$ref": "#/components/schemas/Group"
                },
                "type": "array"
              }
            },
            "required": [
              "Groups"
            ],
            "type": "object"
          }
        ],
        "description": "Enum describing the possible access control options for a contract entry point (method)."
      },
      "EntryPointType": {
        "description": "Context of method execution",
        "enum": [
          "Session",
          "Contract"
        ],
        "type": "string"
      },
      "EraId": {
        "format": "uint64",
        "minimum": 0.0,
        "type": "integer"
      },
      "EraInfo": {
        "additionalProperties": false,
        "description": "Auction metadata.  Intended to be recorded at each era.",
        "properties": {
          "seigniorage_allocations": {
            "items": {
              "$ref": "#/components/schemas/SeigniorageAllocation"
            },
            "type": "array"
          }
        },
        "required": [
          "seigniorage_allocations"
        ],
        "type": "object"
      },
      "EraSummary": {
        "additionalProperties": false,
        "description": "The summary of an era",
        "properties": {
          "block_hash": {
            "allOf": [
              {
                "$ref": "#/components/schemas/BlockHash"
              }
            ],
            "description": "The block hash"
          },
          "era_id": {
            "description": "The era id",
            "format": "uint64",
            "minimum": 0.0,
            "type": "integer"
          },
          "merkle_proof": {
            "description": "The merkle proof",
            "type": "string"
          },
          "state_root_hash": {
            "allOf": [
              {
                "$ref": "#/components/schemas/Digest"
              }
            ],
            "description": "Hex-encoded hash of the state root"
          },
          "stored_value": {
            "allOf": [
              {
                "$ref": "#/components/schemas/StoredValue"
              }
            ],
            "description": "The StoredValue containing era information"
          }
        },
        "required": [
          "block_hash",
          "era_id",
          "merkle_proof",
          "state_root_hash",
          "stored_value"
        ],
        "type": "object"
      },
      "ExecutableDeployItem": {
        "anyOf": [
          {
            "additionalProperties": false,
            "properties": {
              "ModuleBytes": {
                "additionalProperties": false,
                "properties": {
                  "args": {
                    "$ref": "#/components/schemas/RuntimeArgs"
                  },
                  "module_bytes": {
                    "description": "Hex-encoded raw Wasm bytes.",
                    "type": "string"
                  }
                },
                "required": [
                  "args",
                  "module_bytes"
                ],
                "type": "object"
              }
            },
            "required": [
              "ModuleBytes"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "properties": {
              "StoredContractByHash": {
                "additionalProperties": false,
                "properties": {
                  "args": {
                    "$ref": "#/components/schemas/RuntimeArgs"
                  },
                  "entry_point": {
                    "type": "string"
                  },
                  "hash": {
                    "description": "Hex-encoded hash.",
                    "type": "string"
                  }
                },
                "required": [
                  "args",
                  "entry_point",
                  "hash"
                ],
                "type": "object"
              }
            },
            "required": [
              "StoredContractByHash"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "properties": {
              "StoredContractByName": {
                "additionalProperties": false,
                "properties": {
                  "args": {
                    "$ref": "#/components/schemas/RuntimeArgs"
                  },
                  "entry_point": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  }
                },
                "required": [
                  "args",
                  "entry_point",
                  "name"
                ],
                "type": "object"
              }
            },
            "required": [
              "StoredContractByName"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "properties": {
              "StoredVersionedContractByHash": {
                "additionalProperties": false,
                "properties": {
                  "args": {
                    "$ref": "#/components/schemas/RuntimeArgs"
                  },
                  "entry_point": {
                    "type": "string"
                  },
                  "hash": {
                    "description": "Hex-encoded hash.",
                    "type": "string"
                  },
                  "version": {
                    "format": "uint32",
                    "minimum": 0.0,
                    "type": [
                      "integer",
                      "null"
                    ]
                  }
                },
                "required": [
                  "args",
                  "entry_point",
                  "hash"
                ],
                "type": "object"
              }
            },
            "required": [
              "StoredVersionedContractByHash"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "properties": {
              "StoredVersionedContractByName": {
                "additionalProperties": false,
                "properties": {
                  "args": {
                    "$ref": "#/components/schemas/RuntimeArgs"
                  },
                  "entry_point": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  },
                  "version": {
                    "format": "uint32",
                    "minimum": 0.0,
                    "type": [
                      "integer",
                      "null"
                    ]
                  }
                },
                "required": [
                  "args",
                  "entry_point",
                  "name"
                ],
                "type": "object"
              }
            },
            "required": [
              "StoredVersionedContractByName"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "properties": {
              "Transfer": {
                "additionalProperties": false,
                "properties": {
                  "args": {
                    "$ref": "#/components/schemas/RuntimeArgs"
                  }
                },
                "required": [
                  "args"
                ],
                "type": "object"
              }
            },
            "required": [
              "Transfer"
            ],
            "type": "object"
          }
        ]
      },
      "ExecutionEffect": {
        "additionalProperties": false,
        "description": "The effect of executing a single deploy.",
        "properties": {
          "operations": {
            "description": "The resulting operations.",
            "items": {
              "$ref": "#/components/schemas/Operation"
            },
            "type": "array"
          },
          "transforms": {
            "description": "The resulting transformations.",
            "items": {
              "$ref": "#/components/schemas/TransformEntry"
            },
            "type": "array"
          }
        },
        "required": [
          "operations",
          "transforms"
        ],
        "type": "object"
      },
      "ExecutionResult": {
        "anyOf": [
          {
            "additionalProperties": false,
            "description": "The result of a failed execution.",
            "properties": {
              "Failure": {
                "additionalProperties": false,
                "properties": {
                  "cost": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/U512"
                      }
                    ],
                    "description": "The cost of executing the deploy."
                  },
                  "effect": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ExecutionEffect"
                      }
                    ],
                    "description": "The effect of executing the deploy."
                  },
                  "error_message": {
                    "description": "The error message associated with executing the deploy.",
                    "type": "string"
                  },
                  "transfers": {
                    "description": "A record of Transfers performed while executing the deploy.",
                    "items": {
                      "$ref": "#/components/schemas/TransferAddr"
                    },
                    "type": "array"
                  }
                },
                "required": [
                  "cost",
                  "effect",
                  "error_message",
                  "transfers"
                ],
                "type": "object"
              }
            },
            "required": [
              "Failure"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "The result of a successful execution.",
            "properties": {
              "Success": {
                "additionalProperties": false,
                "properties": {
                  "cost": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/U512"
                      }
                    ],
                    "description": "The cost of executing the deploy."
                  },
                  "effect": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/ExecutionEffect"
                      }
                    ],
                    "description": "The effect of executing the deploy."
                  },
                  "transfers": {
                    "description": "A record of Transfers performed while executing the deploy.",
                    "items": {
                      "$ref": "#/components/schemas/TransferAddr"
                    },
                    "type": "array"
                  }
                },
                "required": [
                  "cost",
                  "effect",
                  "transfers"
                ],
                "type": "object"
              }
            },
            "required": [
              "Success"
            ],
            "type": "object"
          }
        ],
        "description": "The result of executing a single deploy."
      },
      "Group": {
        "description": "139 chars",
        "type": "string"
      },
      "Groups": {
        "properties": {
          "group": {
            "type": "string"
          },
          "keys": {
            "items": {
              "$ref": "#/components/schemas/URef"
            },
            "type": "array"
          }
        },
        "required": [
          "group",
          "keys"
        ],
        "type": "object"
      },
      "JsonBid": {
        "additionalProperties": false,
        "description": "An entry in a founding validator map representing a bid.",
        "properties": {
          "bonding_purse": {
            "allOf": [
              {
                "$ref": "#/components/schemas/URef"
              }
            ],
            "description": "The purse that was used for bonding."
          },
          "delegation_rate": {
            "description": "The delegation rate.",
            "format": "uint8",
            "minimum": 0.0,
            "type": "integer"
          },
          "delegators": {
            "description": "The delegators.",
            "items": {
              "$ref": "#/components/schemas/JsonDelegator"
            },
            "type": "array"
          },
          "inactive": {
            "description": "Is this an inactive validator.",
            "type": "boolean"
          },
          "staked_amount": {
            "allOf": [
              {
                "$ref": "#/components/schemas/U512"
              }
            ],
            "description": "The amount of tokens staked by a validator (not including delegators)."
          }
        },
        "required": [
          "bonding_purse",
          "delegation_rate",
          "delegators",
          "inactive",
          "staked_amount"
        ],
        "type": "object"
      },
      "JsonBids": {
        "additionalProperties": false,
        "description": "A Json representation of a single bid.",
        "properties": {
          "bid": {
            "$ref": "#/components/schemas/JsonBid"
          },
          "public_key": {
            "$ref": "#/components/schemas/PublicKey"
          }
        },
        "required": [
          "bid",
          "public_key"
        ],
        "type": "object"
      },
      "JsonBlock": {
        "additionalProperties": false,
        "description": "A JSON-friendly representation of `Block`.",
        "properties": {
          "body": {
            "$ref": "#/components/schemas/JsonBlockBody"
          },
          "hash": {
            "$ref": "#/components/schemas/BlockHash"
          },
          "header": {
            "$ref": "#/components/schemas/JsonBlockHeader"
          },
          "proofs": {
            "items": {
              "$ref": "#/components/schemas/JsonProof"
            },
            "type": "array"
          }
        },
        "required": [
          "body",
          "hash",
          "header",
          "proofs"
        ],
        "type": "object"
      },
      "JsonBlockBody": {
        "additionalProperties": false,
        "description": "A JSON-friendly representation of `Body`",
        "properties": {
          "deploy_hashes": {
            "items": {
              "$ref": "#/components/schemas/DeployHash"
            },
            "type": "array"
          },
          "proposer": {
            "$ref": "#/components/schemas/PublicKey"
          },
          "transfer_hashes": {
            "items": {
              "$ref": "#/components/schemas/DeployHash"
            },
            "type": "array"
          }
        },
        "required": [
          "deploy_hashes",
          "proposer",
          "transfer_hashes"
        ],
        "type": "object"
      },
      "JsonBlockHeader": {
        "additionalProperties": false,
        "properties": {
          "accumulated_seed": {
            "$ref": "#/components/schemas/Digest"
          },
          "body_hash": {
            "$ref": "#/components/schemas/Digest"
          },
          "era_end": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/JsonEraEnd"
              },
              {
                "type": "null"
              }
            ]
          },
          "era_id": {
            "$ref": "#/components/schemas/EraId"
          },
          "height": {
            "format": "uint64",
            "minimum": 0.0,
            "type": "integer"
          },
          "parent_hash": {
            "$ref": "#/components/schemas/BlockHash"
          },
          "protocol_version": {
            "$ref": "#/components/schemas/ProtocolVersion"
          },
          "random_bit": {
            "type": "boolean"
          },
          "state_root_hash": {
            "$ref": "#/components/schemas/Digest"
          },
          "timestamp": {
            "$ref": "#/components/schemas/Timestamp"
          }
        },
        "required": [
          "accumulated_seed",
          "body_hash",
          "era_id",
          "height",
          "parent_hash",
          "protocol_version",
          "random_bit",
          "state_root_hash",
          "timestamp"
        ],
        "type": "object"
      },
      "JsonDelegator": {
        "additionalProperties": false,
        "description": "A delegator associated with the given validator.",
        "properties": {
          "bonding_purse": {
            "$ref": "#/components/schemas/URef"
          },
          "delegatee": {
            "$ref": "#/components/schemas/PublicKey"
          },
          "public_key": {
            "$ref": "#/components/schemas/PublicKey"
          },
          "staked_amount": {
            "$ref": "#/components/schemas/U512"
          }
        },
        "required": [
          "bonding_purse",
          "delegatee",
          "public_key",
          "staked_amount"
        ],
        "type": "object"
      },
      "JsonEraEnd": {
        "additionalProperties": false,
        "properties": {
          "era_report": {
            "$ref": "#/components/schemas/JsonEraReport"
          },
          "next_era_validator_weights": {
            "items": {
              "$ref": "#/components/schemas/ValidatorWeight"
            },
            "type": "array"
          }
        },
        "required": [
          "era_report",
          "next_era_validator_weights"
        ],
        "type": "object"
      },
      "JsonEraReport": {
        "additionalProperties": false,
        "description": "Equivocation and reward information to be included in the terminal block.",
        "properties": {
          "equivocators": {
            "items": {
              "$ref": "#/components/schemas/PublicKey"
            },
            "type": "array"
          },
          "inactive_validators": {
            "items": {
              "$ref": "#/components/schemas/PublicKey"
            },
            "type": "array"
          },
          "rewards": {
            "items": {
              "$ref": "#/components/schemas/Reward"
            },
            "type": "array"
          }
        },
        "required": [
          "equivocators",
          "inactive_validators",
          "rewards"
        ],
        "type": "object"
      },
      "JsonEraValidators": {
        "additionalProperties": false,
        "description": "The validators for the given era.",
        "properties": {
          "era_id": {
            "format": "uint64",
            "minimum": 0.0,
            "type": "integer"
          },
          "validator_weights": {
            "items": {
              "$ref": "#/components/schemas/JsonValidatorWeights"
            },
            "type": "array"
          }
        },
        "required": [
          "era_id",
          "validator_weights"
        ],
        "type": "object"
      },
      "JsonExecutionResult": {
        "additionalProperties": false,
        "description": "The execution result of a single deploy.",
        "properties": {
          "block_hash": {
            "allOf": [
              {
                "$ref": "#/components/schemas/BlockHash"
              }
            ],
            "description": "The block hash."
          },
          "result": {
            "allOf": [
              {
                "$ref": "#/components/schemas/ExecutionResult"
              }
            ],
            "description": "Execution result."
          }
        },
        "required": [
          "block_hash",
          "result"
        ],
        "type": "object"
      },
      "JsonProof": {
        "additionalProperties": false,
        "description": "A JSON-friendly representation of a proof, i.e. a block's finality signature.",
        "properties": {
          "public_key": {
            "$ref": "#/components/schemas/PublicKey"
          },
          "signature": {
            "$ref": "#/components/schemas/Signature"
          }
        },
        "required": [
          "public_key",
          "signature"
        ],
        "type": "object"
      },
      "JsonValidatorWeights": {
        "additionalProperties": false,
        "description": "A validator's weight.",
        "properties": {
          "public_key": {
            "$ref": "#/components/schemas/PublicKey"
          },
          "weight": {
            "$ref": "#/components/schemas/U512"
          }
        },
        "required": [
          "public_key",
          "weight"
        ],
        "type": "object"
      },
      "MinimalBlockInfo": {
        "additionalProperties": false,
        "description": "Minimal info of a `Block`.",
        "properties": {
          "creator": {
            "$ref": "#/components/schemas/PublicKey"
          },
          "era_id": {
            "$ref": "#/components/schemas/EraId"
          },
          "hash": {
            "$ref": "#/components/schemas/BlockHash"
          },
          "height": {
            "format": "uint64",
            "minimum": 0.0,
            "type": "integer"
          },
          "state_root_hash": {
            "$ref": "#/components/schemas/Digest"
          },
          "timestamp": {
            "$ref": "#/components/schemas/Timestamp"
          }
        },
        "required": [
          "creator",
          "era_id",
          "hash",
          "height",
          "state_root_hash",
          "timestamp"
        ],
        "type": "object"
      },
      "NamedArg": {
        "description": "Named arguments to a contract",
        "items": [
          {
            "type": "string"
          },
          {
            "$ref": "#/components/schemas/CLValue"
          }
        ],
        "maxItems": 2,
        "minItems": 2,
        "type": "array"
      },
      "NamedKey": {
        "additionalProperties": false,
        "description": "A named key.",
        "properties": {
          "key": {
            "description": "The value of the entry: a casper `Key` type.",
            "type": "string"
          },
          "name": {
            "description": "The name of the entry.",
            "type": "string"
          }
        },
        "required": [
          "key",
          "name"
        ],
        "type": "object"
      },
      "NextUpgrade": {
        "description": "Information about the next protocol upgrade.",
        "properties": {
          "activation_point": {
            "$ref": "#/components/schemas/ActivationPoint"
          },
          "protocol_version": {
            "type": "string"
          }
        },
        "required": [
          "activation_point",
          "protocol_version"
        ],
        "type": "object"
      },
      "OpKind": {
        "description": "The type of operation performed while executing a deploy.",
        "enum": [
          "Read",
          "Write",
          "Add",
          "NoOp"
        ],
        "type": "string"
      },
      "Operation": {
        "additionalProperties": false,
        "description": "An operation performed while executing a deploy.",
        "properties": {
          "key": {
            "description": "The formatted string of the `Key`.",
            "type": "string"
          },
          "kind": {
            "allOf": [
              {
                "$ref": "#/components/schemas/OpKind"
              }
            ],
            "description": "The type of operation."
          }
        },
        "required": [
          "key",
          "kind"
        ],
        "type": "object"
      },
      "Parameter": {
        "description": "Parameter to a method",
        "properties": {
          "cl_type": {
            "$ref": "#/components/schemas/CLType"
          },
          "name": {
            "type": "string"
          }
        },
        "required": [
          "cl_type",
          "name"
        ],
        "type": "object"
      },
      "PeerEntry": {
        "additionalProperties": false,
        "properties": {
          "address": {
            "type": "string"
          },
          "node_id": {
            "type": "string"
          }
        },
        "required": [
          "address",
          "node_id"
        ],
        "type": "object"
      },
      "PeersMap": {
        "description": "Map of peer IDs to network addresses.",
        "items": {
          "$ref": "#/components/schemas/PeerEntry"
        },
        "type": "array"
      },
      "ProtocolVersion": {
        "description": "Casper Platform protocol version",
        "type": "string"
      },
      "PublicKey": {
        "description": "Hex-encoded cryptographic public key, including the algorithm tag prefix.",
        "type": "string"
      },
      "Reward": {
        "additionalProperties": false,
        "properties": {
          "amount": {
            "format": "uint64",
            "minimum": 0.0,
            "type": "integer"
          },
          "validator": {
            "$ref": "#/components/schemas/PublicKey"
          }
        },
        "required": [
          "amount",
          "validator"
        ],
        "type": "object"
      },
      "RuntimeArgs": {
        "description": "Represents a collection of arguments passed to a smart contract.",
        "items": {
          "$ref": "#/components/schemas/NamedArg"
        },
        "type": "array"
      },
      "SeigniorageAllocation": {
        "anyOf": [
          {
            "additionalProperties": false,
            "description": "Info about a seigniorage allocation for a validator",
            "properties": {
              "Validator": {
                "additionalProperties": false,
                "properties": {
                  "amount": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/U512"
                      }
                    ],
                    "description": "Allocated amount"
                  },
                  "validator_public_key": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PublicKey"
                      }
                    ],
                    "description": "Validator's public key"
                  }
                },
                "required": [
                  "amount",
                  "validator_public_key"
                ],
                "type": "object"
              }
            },
            "required": [
              "Validator"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Info about a seigniorage allocation for a delegator",
            "properties": {
              "Delegator": {
                "additionalProperties": false,
                "properties": {
                  "amount": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/U512"
                      }
                    ],
                    "description": "Allocated amount"
                  },
                  "delegator_public_key": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PublicKey"
                      }
                    ],
                    "description": "Delegator's public key"
                  },
                  "validator_public_key": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PublicKey"
                      }
                    ],
                    "description": "Validator's public key"
                  }
                },
                "required": [
                  "amount",
                  "delegator_public_key",
                  "validator_public_key"
                ],
                "type": "object"
              }
            },
            "required": [
              "Delegator"
            ],
            "type": "object"
          }
        ],
        "description": "Information about a seigniorage allocation"
      },
      "Signature": {
        "description": "Hex-encoded cryptographic signature, including the algorithm tag prefix.",
        "type": "string"
      },
      "StoredValue": {
        "anyOf": [
          {
            "additionalProperties": false,
            "description": "A CasperLabs value.",
            "properties": {
              "CLValue": {
                "$ref": "#/components/schemas/CLValue"
              }
            },
            "required": [
              "CLValue"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "An account.",
            "properties": {
              "Account": {
                "$ref": "#/components/schemas/Account"
              }
            },
            "required": [
              "Account"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "A contract's Wasm",
            "properties": {
              "ContractWasm": {
                "type": "string"
              }
            },
            "required": [
              "ContractWasm"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Methods and type signatures supported by a contract.",
            "properties": {
              "Contract": {
                "$ref": "#/components/schemas/Contract"
              }
            },
            "required": [
              "Contract"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "A contract definition, metadata, and security container.",
            "properties": {
              "ContractPackage": {
                "$ref": "#/components/schemas/ContractPackage"
              }
            },
            "required": [
              "ContractPackage"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "A record of a transfer",
            "properties": {
              "Transfer": {
                "$ref": "#/components/schemas/Transfer"
              }
            },
            "required": [
              "Transfer"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "A record of a deploy",
            "properties": {
              "DeployInfo": {
                "$ref": "#/components/schemas/DeployInfo"
              }
            },
            "required": [
              "DeployInfo"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Auction metadata",
            "properties": {
              "EraInfo": {
                "$ref": "#/components/schemas/EraInfo"
              }
            },
            "required": [
              "EraInfo"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "A bid",
            "properties": {
              "Bid": {
                "$ref": "#/components/schemas/Bid"
              }
            },
            "required": [
              "Bid"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "A withdraw",
            "properties": {
              "Withdraw": {
                "items": {
                  "$ref": "#/components/schemas/UnbondingPurse"
                },
                "type": "array"
              }
            },
            "required": [
              "Withdraw"
            ],
            "type": "object"
          }
        ],
        "description": "181 chars"
      },
      "TimeDiff": {
        "description": "Human-readable duration.",
        "format": "uint64",
        "minimum": 0.0,
        "type": "integer"
      },
      "Timestamp": {
        "description": "Timestamp formatted as per RFC 3339",
        "format": "uint64",
        "minimum": 0.0,
        "type": "integer"
      },
      "Transfer": {
        "additionalProperties": false,
        "description": "Represents a transfer from one purse to another",
        "properties": {
          "amount": {
            "allOf": [
              {
                "$ref": "#/components/schemas/U512"
              }
            ],
            "description": "Transfer amount"
          },
          "deploy_hash": {
            "allOf": [
              {
                "$ref": "#/components/schemas/DeployHash"
              }
            ],
            "description": "Deploy that created the transfer"
          },
          "from": {
            "allOf": [
              {
                "$ref": "#/components/schemas/AccountHash"
              }
            ],
            "description": "Account from which transfer was executed"
          },
          "gas": {
            "allOf": [
              {
                "$ref": "#/components/schemas/U512"
              }
            ],
            "description": "Gas"
          },
          "id": {
            "description": "User-defined id",
            "format": "uint64",
            "minimum": 0.0,
            "type": [
              "integer",
              "null"
            ]
          },
          "source": {
            "allOf": [
              {
                "$ref": "#/components/schemas/URef"
              }
            ],
            "description": "Source purse"
          },
          "target": {
            "allOf": [
              {
                "$ref": "#/components/schemas/URef"
              }
            ],
            "description": "Target purse"
          },
          "to": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/AccountHash"
              },
              {
                "type": "null"
              }
            ],
            "description": "Account to which funds are transferred"
          }
        },
        "required": [
          "amount",
          "deploy_hash",
          "from",
          "gas",
          "source",
          "target"
        ],
        "type": "object"
      },
      "TransferAddr": {
        "description": "Hex-encoded transfer address.",
        "type": "string"
      },
      "Transform": {
        "anyOf": [
          {
            "enum": [
              "Identity",
              "WriteContractWasm",
              "WriteContract",
              "WriteContractPackage"
            ],
            "type": "string"
          },
          {
            "additionalProperties": false,
            "description": "Writes the given CLValue to global state.",
            "properties": {
              "WriteCLValue": {
                "$ref": "#/components/schemas/CLValue"
              }
            },
            "required": [
              "WriteCLValue"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Writes the given Account to global state.",
            "properties": {
              "WriteAccount": {
                "$ref": "#/components/schemas/AccountHash"
              }
            },
            "required": [
              "WriteAccount"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Writes the given DeployInfo to global state.",
            "properties": {
              "WriteDeployInfo": {
                "$ref": "#/components/schemas/DeployInfo"
              }
            },
            "required": [
              "WriteDeployInfo"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Writes the given EraInfo to global state.",
            "properties": {
              "WriteEraInfo": {
                "$ref": "#/components/schemas/EraInfo"
              }
            },
            "required": [
              "WriteEraInfo"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Writes the given Transfer to global state.",
            "properties": {
              "WriteTransfer": {
                "$ref": "#/components/schemas/Transfer"
              }
            },
            "required": [
              "WriteTransfer"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Writes the given Bid to global state.",
            "properties": {
              "WriteBid": {
                "$ref": "#/components/schemas/Bid"
              }
            },
            "required": [
              "WriteBid"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Writes the given Withdraw to global state.",
            "properties": {
              "WriteWithdraw": {
                "items": {
                  "$ref": "#/components/schemas/UnbondingPurse"
                },
                "type": "array"
              }
            },
            "required": [
              "WriteWithdraw"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Adds the given `i32`.",
            "properties": {
              "AddInt32": {
                "format": "int32",
                "type": "integer"
              }
            },
            "required": [
              "AddInt32"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Adds the given `u64`.",
            "properties": {
              "AddUInt64": {
                "format": "uint64",
                "minimum": 0.0,
                "type": "integer"
              }
            },
            "required": [
              "AddUInt64"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Adds the given `U128`.",
            "properties": {
              "AddUInt128": {
                "$ref": "#/components/schemas/U128"
              }
            },
            "required": [
              "AddUInt128"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Adds the given `U256`.",
            "properties": {
              "AddUInt256": {
                "$ref": "#/components/schemas/U256"
              }
            },
            "required": [
              "AddUInt256"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Adds the given `U512`.",
            "properties": {
              "AddUInt512": {
                "$ref": "#/components/schemas/U512"
              }
            },
            "required": [
              "AddUInt512"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "Adds the given collection of named keys.",
            "properties": {
              "AddKeys": {
                "items": {
                  "$ref": "#/components/schemas/NamedKey"
                },
                "type": "array"
              }
            },
            "required": [
              "AddKeys"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "description": "A failed transformation, containing an error message.",
            "properties": {
              "Failure": {
                "type": "string"
              }
            },
            "required": [
              "Failure"
            ],
            "type": "object"
          }
        ],
        "description": "The actual transformation performed while executing a deploy."
      },
      "TransformEntry": {
        "additionalProperties": false,
        "description": "A transformation performed while executing a deploy.",
        "properties": {
          "key": {
            "description": "The formatted string of the `Key`.",
            "type": "string"
          },
          "transform": {
            "allOf": [
              {
                "$ref": "#/components/schemas/Transform"
              }
            ],
            "description": "The transformation."
          }
        },
        "required": [
          "key",
          "transform"
        ],
        "type": "object"
      },
      "U128": {
        "description": "Decimal representation of a 128-bit integer.",
        "type": "string"
      },
      "U256": {
        "description": "Decimal representation of a 256-bit integer.",
        "type": "string"
      },
      "U512": {
        "description": "Decimal representation of a 512-bit integer.",
        "type": "string"
      },
      "URef": {
        "description": "Hex-encoded, formatted URef.",
        "type": "string"
      },
      "UnbondingPurse": {
        "additionalProperties": false,
        "description": "Unbonding purse.",
        "properties": {
          "amount": {
            "allOf": [
              {
                "$ref": "#/components/schemas/U512"
              }
            ],
            "description": "Unbonding Amount."
          },
          "bonding_purse": {
            "allOf": [
              {
                "$ref": "#/components/schemas/URef"
              }
            ],
            "description": "Bonding Purse"
          },
          "era_of_creation": {
            "description": "Era in which this unbonding request was created.",
            "format": "uint64",
            "minimum": 0.0,
            "type": "integer"
          },
          "unbonder_public_key": {
            "allOf": [
              {
                "$ref": "#/components/schemas/PublicKey"
              }
            ],
            "description": "Unbonders public key."
          },
          "validator_public_key": {
            "allOf": [
              {
                "$ref": "#/components/schemas/PublicKey"
              }
            ],
            "description": "Validators public key."
          }
        },
        "required": [
          "amount",
          "bonding_purse",
          "era_of_creation",
          "unbonder_public_key",
          "validator_public_key"
        ],
        "type": "object"
      },
      "ValidatorWeight": {
        "additionalProperties": false,
        "properties": {
          "validator": {
            "$ref": "#/components/schemas/PublicKey"
          },
          "weight": {
            "$ref": "#/components/schemas/U512"
          }
        },
        "required": [
          "validator",
          "weight"
        ],
        "type": "object"
      },
      "VestingSchedule": {
        "additionalProperties": false,
        "properties": {
          "initial_release_timestamp_millis": {
            "format": "uint64",
            "minimum": 0.0,
            "type": "integer"
          },
          "locked_amounts": {
            "items": {
              "$ref": "#/components/schemas/U512"
            },
            "maxItems": 14,
            "minItems": 14,
            "type": [
              "array",
              "null"
            ]
          }
        },
        "required": [
          "initial_release_timestamp_millis"
        ],
        "type": "object"
      }
    }
  },
  "info": {
    "contact": {
      "name": "CasperLabs",
      "url": "https://casperlabs.io"
    },
    "description": "This describes the JSON-RPC 2.0 API of a node on the Casper network.",
    "license": {
      "name": "CasperLabs Open Source License Version 1.0",
      "url": "https://raw.githubusercontent.com/CasperLabs/casper-node/master/LICENSE"
    },
    "title": "Client API of Casper Node",
    "version": "1.0.0"
  },
  "methods": [
    {
      "examples": [
        {
          "name": "account_put_deploy_example",
          "params": [
            {
              "name": "deploy",
              "value": {
                "approvals": [
                  {
                    "signature": "130 chars",
                    "signer": "01d9bf2148748a85c89da5aad8ee0b0fc2d105fd39d41a4c796536354f0ae2900c"
                  }
                ],
                "hash": "01da3c604f71e0e7df83ff1ab4ef15bb04de64ca02e3d2b78de6950e8b5ee187",
                "header": {
                  "account": "01d9bf2148748a85c89da5aad8ee0b0fc2d105fd39d41a4c796536354f0ae2900c",
                  "body_hash": "4811966d37fe5674a8af4001884ea0d9042d1c06668da0c963769c3a01ebd08f",
                  "chain_name": "casper-example",
                  "dependencies": [
                    "0101010101010101010101010101010101010101010101010101010101010101"
                  ],
                  "gas_price": 1,
                  "timestamp": "2020-11-17T00:39:24.072Z",
                  "ttl": "1h"
                },
                "payment": {
                  "StoredContractByName": {
                    "args": [
                      [
                        "quantity",
                        {
                          "bytes": "e8030000",
                          "cl_type": "I32",
                          "parsed": 1000
                        }
                      ]
                    ],
                    "entry_point": "example-entry-point",
                    "name": "casper-example"
                  }
                },
                "session": {
                  "Transfer": {
                    "args": [
                      [
                        "amount",
                        {
                          "bytes": "e8030000",
                          "cl_type": "I32",
                          "parsed": 1000
                        }
                      ]
                    ]
                  }
                }
              }
            }
          ],
          "result": {
            "name": "account_put_deploy_example_result",
            "value": {
              "api_version": "1.0.0",
              "deploy_hash": "01da3c604f71e0e7df83ff1ab4ef15bb04de64ca02e3d2b78de6950e8b5ee187"
            }
          }
        }
      ],
      "name": "account_put_deploy",
      "params": [
        {
          "name": "deploy",
          "required": true,
          "schema": {
            "$ref": "#/components/schemas/Deploy",
            "description": "The `Deploy`."
          }
        }
      ],
      "result": {
        "name": "account_put_deploy_result",
        "schema": {
          "additionalProperties": false,
          "description": "Result for \"account_put_deploy\" RPC response.",
          "properties": {
            "api_version": {
              "description": "The RPC API version.",
              "type": "string"
            },
            "deploy_hash": {
              "$ref": "#/components/schemas/DeployHash",
              "description": "The deploy hash."
            }
          },
          "required": [
            "api_version",
            "deploy_hash"
          ],
          "type": "object"
        }
      },
      "summary": "receives a Deploy to be executed by the network"
    },
    {
      "examples": [
        {
          "name": "info_get_deploy_example",
          "params": [
            {
              "name": "deploy_hash",
              "value": "01da3c604f71e0e7df83ff1ab4ef15bb04de64ca02e3d2b78de6950e8b5ee187"
            }
          ],
          "result": {
            "name": "info_get_deploy_example_result",
            "value": {
              "api_version": "1.0.0",
              "deploy": {
                "approvals": [
                  {
                    "signature": "130 chars",
                    "signer": "01d9bf2148748a85c89da5aad8ee0b0fc2d105fd39d41a4c796536354f0ae2900c"
                  }
                ],
                "hash": "01da3c604f71e0e7df83ff1ab4ef15bb04de64ca02e3d2b78de6950e8b5ee187",
                "header": {
                  "account": "01d9bf2148748a85c89da5aad8ee0b0fc2d105fd39d41a4c796536354f0ae2900c",
                  "body_hash": "4811966d37fe5674a8af4001884ea0d9042d1c06668da0c963769c3a01ebd08f",
                  "chain_name": "casper-example",
                  "dependencies": [
                    "0101010101010101010101010101010101010101010101010101010101010101"
                  ],
                  "gas_price": 1,
                  "timestamp": "2020-11-17T00:39:24.072Z",
                  "ttl": "1h"
                },
                "payment": {
                  "StoredContractByName": {
                    "args": [
                      [
                        "quantity",
                        {
                          "bytes": "e8030000",
                          "cl_type": "I32",
                          "parsed": 1000
                        }
                      ]
                    ],
                    "entry_point": "example-entry-point",
                    "name": "casper-example"
                  }
                },
                "session": {
                  "Transfer": {
                    "args": [
                      [
                        "amount",
                        {
                          "bytes": "e8030000",
                          "cl_type": "I32",
                          "parsed": 1000
                        }
                      ]
                    ]
                  }
                }
              },
              "execution_results": [
                {
                  "block_hash": "528c63a9e30bf6e52b9d38f7c1a3e2ec035a54bfb29225d31ecedff00eebbe18",
                  "result": {
                    "Success": {
                      "cost": "123456",
                      "effect": {
                        "operations": [
                          {
                            "key": "account-hash-2c4a11c062a8a337bfc97e27fd66291caeb2c65865dcb5d3ef3759c4c97efecb",
                            "kind": "Write"
                          },
                          {
                            "key": "deploy-af684263911154d26fa05be9963171802801a0b6aff8f199b7391eacb8edc9e1",
                            "kind": "Read"
                          }
                        ],
                        "transforms": [
                          {
                            "key": "uref-2c4a11c062a8a337bfc97e27fd66291caeb2c65865dcb5d3ef3759c4c97efecb-007",
                            "transform": {
                              "AddUInt64": 8
                            }
                          },
                          {
                            "key": "deploy-af684263911154d26fa05be9963171802801a0b6aff8f199b7391eacb8edc9e1",
                            "transform": "Identity"
                          }
                        ]
                      },
                      "transfers": [
                        "transfer-5959595959595959595959595959595959595959595959595959595959595959",
                        "transfer-8282828282828282828282828282828282828282828282828282828282828282"
                      ]
                    }
                  }
                }
              ]
            }
          }
        }
      ],
      "name": "info_get_deploy",
      "params": [
        {
          "name": "deploy_hash",
          "required": true,
          "schema": {
            "$ref": "#/components/schemas/DeployHash",
            "description": "The deploy hash."
          }
        }
      ],
      "result": {
        "name": "info_get_deploy_result",
        "schema": {
          "additionalProperties": false,
          "description": "Result for \"info_get_deploy\" RPC response.",
          "properties": {
            "api_version": {
              "description": "The RPC API version.",
              "type": "string"
            },
            "deploy": {
              "$ref": "#/components/schemas/Deploy",
              "description": "The deploy."
            },
            "execution_results": {
              "description": "The map of block hash to execution result.",
              "items": {
                "$ref": "#/components/schemas/JsonExecutionResult"
              },
              "type": "array"
            }
          },
          "required": [
            "api_version",
            "deploy",
            "execution_results"
          ],
          "type": "object"
        }
      },
      "summary": "returns a Deploy from the network"
    },
    {
      "examples": [
        {
          "name": "info_get_peers_example",
          "params": [],
          "result": {
            "name": "info_get_peers_example_result",
            "value": {
              "api_version": "1.0.0",
              "peers": [
                {
                  "address": "127.0.0.1:54321",
                  "node_id": "NodeId::Tls(0101..0101)"
                }
              ]
            }
          }
        }
      ],
      "name": "info_get_peers",
      "params": [],
      "result": {
        "name": "info_get_peers_result",
        "schema": {
          "additionalProperties": false,
          "description": "Result for \"info_get_peers\" RPC response.",
          "properties": {
            "api_version": {
              "description": "The RPC API version.",
              "type": "string"
            },
            "peers": {
              "$ref": "#/components/schemas/PeersMap",
              "description": "The node ID and network address of each connected peer."
            }
          },
          "required": [
            "api_version",
            "peers"
          ],
          "type": "object"
        }
      },
      "summary": "returns a list of peers connected to the node"
    },
    {
      "examples": [
        {
          "name": "info_get_status_example",
          "params": [],
          "result": {
            "name": "info_get_status_example_result",
            "value": {
              "api_version": "1.0.0",
              "build_version": "1.0.0-31d7de47",
              "chainspec_name": "casper-example",
              "last_added_block_info": {
                "creator": "01d9bf2148748a85c89da5aad8ee0b0fc2d105fd39d41a4c796536354f0ae2900c",
                "era_id": 1,
                "hash": "528c63a9e30bf6e52b9d38f7c1a3e2ec035a54bfb29225d31ecedff00eebbe18",
                "height": 10,
                "state_root_hash": "0808080808080808080808080808080808080808080808080808080808080808",
                "timestamp": "2020-11-17T00:39:24.072Z"
              },
              "next_upgrade": {
                "activation_point": 42,
                "protocol_version": "2.0.1"
              },
              "our_public_signing_key": "01d9bf2148748a85c89da5aad8ee0b0fc2d105fd39d41a4c796536354f0ae2900c",
              "peers": [
                {
                  "address": "127.0.0.1:54321",
                  "node_id": "NodeId::Tls(0101..0101)"
                }
              ],
              "round_length": "1m 5s 536ms",
              "starting_state_root_hash": "0202..0202"
            }
          }
        }
      ],
      "name": "info_get_status",
      "params": [],
      "result": {
        "name": "info_get_status_result",
        "schema": {
          "additionalProperties": false,
          "description": "Result for \"info_get_status\" RPC response.",
          "properties": {
            "api_version": {
              "description": "The RPC API version.",
              "type": "string"
            },
            "build_version": {
              "description": "The compiled node version.",
              "type": "string"
            },
            "chainspec_name": {
              "description": "The chainspec name.",
              "type": "string"
            },
            "last_added_block_info": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/MinimalBlockInfo"
                },
                {
                  "type": "null"
                }
              ],
              "description": "The minimal info of the last block from the linear chain."
            },
            "next_upgrade": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/NextUpgrade"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Information about the next scheduled upgrade."
            },
            "our_public_signing_key": {
              "$ref": "#/components/schemas/PublicKey",
              "description": "Our public signing key."
            },
            "peers": {
              "$ref": "#/components/schemas/PeersMap",
              "description": "The node ID and network address of each connected peer."
            },
            "round_length": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/TimeDiff"
                },
                {
                  "type": "null"
                }
              ],
              "description": "The next round length if this node is a validator."
            },
            "starting_state_root_hash": {
              "description": "The state root hash used at the start of the current session.",
              "type": "string"
            }
          },
          "required": [
            "api_version",
            "build_version",
            "chainspec_name",
            "our_public_signing_key",
            "peers",
            "starting_state_root_hash"
          ],
          "type": "object"
        }
      },
      "summary": "returns the current status of the node"
    },
    {
      "examples": [
        {
          "name": "chain_get_block_example",
          "params": [
            {
              "name": "block_identifier",
              "value": {
                "Hash": "528c63a9e30bf6e52b9d38f7c1a3e2ec035a54bfb29225d31ecedff00eebbe18"
              }
            }
          ],
          "result": {
            "name": "chain_get_block_example_result",
            "value": {
              "api_version": "1.0.0",
              "block": {
                "body": {
                  "deploy_hashes": [
                    "01da3c604f71e0e7df83ff1ab4ef15bb04de64ca02e3d2b78de6950e8b5ee187"
                  ],
                  "proposer": "01d9bf2148748a85c89da5aad8ee0b0fc2d105fd39d41a4c796536354f0ae2900c",
                  "transfer_hashes": []
                },
                "hash": "528c63a9e30bf6e52b9d38f7c1a3e2ec035a54bfb29225d31ecedff00eebbe18",
                "header": {
                  "accumulated_seed": "ac979f51525cfd979b14aa7dc0737c5154eabe0db9280eceaa8dc8d2905b20d5",
                  "body_hash": "5f4b03936cebebe35eb1f2c542d34098b4c645c898673f1597de64ebdf916956",
                  "era_end": {
                    "era_report": {
                      "equivocators": [
                        "013b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29"
                      ],
                      "inactive_validators": [
                        "018139770ea87d175f56a35466c34c7ecccb8d8a91b4ee37a25df60f5b8fc9b394"
                      ],
                      "rewards": [
                        {
                          "amount": 1000,
                          "validator": "018a88e3dd7409f195fd52db2d3cba5d72ca6709bf1d94121bf3748801b40f6f5c"
                        }
                      ]
                    },
                    "next_era_validator_weights": [
                      {
                        "validator": "016e7a1cdd29b0b78fd13af4c5598feff4ef2a97166e3ca6f2e4fbfccd80505bf1",
                        "weight": "456"
                      },
                      {
                        "validator": "018a875fff1eb38451577acd5afee405456568dd7c89e090863a0557bc7af49f17",
                        "weight": "789"
                      },
                      {
                        "validator": "01d9bf2148748a85c89da5aad8ee0b0fc2d105fd39d41a4c796536354f0ae2900c",
                        "weight": "123"
                      }
                    ]
                  },
                  "era_id": 1,
                  "height": 10,
                  "parent_hash": "0707070707070707070707070707070707070707070707070707070707070707",
                  "protocol_version": "1.0.0",
                  "random_bit": true,
                  "state_root_hash": "0808080808080808080808080808080808080808080808080808080808080808",
                  "timestamp": "2020-11-17T00:39:24.072Z"
                },
                "proofs": [
                  {
                    "public_key": "01d9bf2148748a85c89da5aad8ee0b0fc2d105fd39d41a4c796536354f0ae2900c",
                    "signature": "130 chars"
                  }
                ]
              }
            }
          }
        }
      ],
      "name": "chain_get_block",
      "params": [
        {
          "name": "block_identifier",
          "required": true,
          "schema": {
            "$ref": "#/components/schemas/BlockIdentifier",
            "description": "The block hash."
          }
        }
      ],
      "result": {
        "name": "chain_get_block_result",
        "schema": {
          "additionalProperties": false,
          "description": "Result for \"chain_get_block\" RPC response.",
          "properties": {
            "api_version": {
              "description": "The RPC API version.",
              "type": "string"
            },
            "block": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/JsonBlock"
                },
                {
                  "type": "null"
                }
              ],
              "description": "The block, if found."
            }
          },
          "required": [
            "api_version"
          ],
          "type": "object"
        }
      },
      "summary": "returns a Block from the network"
    },
    {
      "examples": [
        {
          "name": "chain_get_block_transfers_example",
          "params": [
            {
              "name": "block_identifier",
              "value": {
                "Hash": "528c63a9e30bf6e52b9d38f7c1a3e2ec035a54bfb29225d31ecedff00eebbe18"
              }
            }
          ],
          "result": {
            "name": "chain_get_block_transfers_example_result",
            "value": {
              "api_version": "1.0.0",
              "block_hash": "528c63a9e30bf6e52b9d38f7c1a3e2ec035a54bfb29225d31ecedff00eebbe18",
              "transfers": [
                {
                  "amount": "0",
                  "deploy_hash": "0000000000000000000000000000000000000000000000000000000000000000",
                  "from": "account-hash-0000000000000000000000000000000000000000000000000000000000000000",
                  "gas": "0",
                  "id": null,
                  "source": "uref-0000000000000000000000000000000000000000000000000000000000000000-000",
                  "target": "uref-0000000000000000000000000000000000000000000000000000000000000000-000",
                  "to": null
                }
              ]
            }
          }
        }
      ],
      "name": "chain_get_block_transfers",
      "params": [
        {
          "name": "block_identifier",
          "required": true,
          "schema": {
            "$ref": "#/components/schemas/BlockIdentifier",
            "description": "The block hash."
          }
        }
      ],
      "result": {
        "name": "chain_get_block_transfers_result",
        "schema": {
          "additionalProperties": false,
          "description": "Result for \"chain_get_block_transfers\" RPC response.",
          "properties": {
            "api_version": {
              "description": "The RPC API version.",
              "type": "string"
            },
            "block_hash": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/BlockHash"
                },
                {
                  "type": "null"
                }
              ],
              "description": "The block hash, if found."
            },
            "transfers": {
              "description": "The block's transfers, if found.",
              "items": {
                "$ref": "#/components/schemas/Transfer"
              },
              "type": [
                "array",
                "null"
              ]
            }
          },
          "required": [
            "api_version"
          ],
          "type": "object"
        }
      },
      "summary": "returns all transfers for a Block from the network"
    },
    {
      "examples": [
        {
          "name": "chain_get_state_root_hash_example",
          "params": [
            {
              "name": "block_identifier",
              "value": {
                "Height": 10
              }
            }
          ],
          "result": {
            "name": "chain_get_state_root_hash_example_result",
            "value": {
              "api_version": "1.0.0",
              "state_root_hash": "0808080808080808080808080808080808080808080808080808080808080808"
            }
          }
        }
      ],
      "name": "chain_get_state_root_hash",
      "params": [
        {
          "name": "block_identifier",
          "required": true,
          "schema": {
            "$ref": "#/components/schemas/BlockIdentifier",
            "description": "The block hash."
          }
        }
      ],
      "result": {
        "name": "chain_get_state_root_hash_result",
        "schema": {
          "additionalProperties": false,
          "description": "Result for \"chain_get_state_root_hash\" RPC response.",
          "properties": {
            "api_version": {
              "description": "The RPC API version.",
              "type": "string"
            },
            "state_root_hash": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/Digest"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Hex-encoded hash of the state root."
            }
          },
          "required": [
            "api_version"
          ],
          "type": "object"
        }
      },
      "summary": "returns a state root hash at a given Block"
    },
    {
      "examples": [
        {
          "name": "state_get_item_example",
          "params": [
            {
              "name": "key",
              "value": "deploy-af684263911154d26fa05be9963171802801a0b6aff8f199b7391eacb8edc9e1"
            },
            {
              "name": "path",
              "value": [
                "inner"
              ]
            },
            {
              "name": "state_root_hash",
              "value": "0808080808080808080808080808080808080808080808080808080808080808"
            }
          ],
          "result": {
            "name": "state_get_item_example_result",
            "value": {
              "api_version": "1.0.0",
              "merkle_proof": "936 chars",
              "stored_value": {
                "CLValue": {
                  "bytes": "0100000000000000",
                  "cl_type": "U64",
                  "parsed": 1
                }
              }
            }
          }
        }
      ],
      "name": "state_get_item",
      "params": [
        {
          "name": "state_root_hash",
          "required": true,
          "schema": {
            "$ref": "#/components/schemas/Digest",
            "description": "Hash of the state root."
          }
        },
        {
          "name": "key",
          "required": true,
          "schema": {
            "description": "`casper_types::Key` as formatted string.",
            "type": "string"
          }
        },
        {
          "name": "path",
          "required": false,
          "schema": {
            "default": [],
            "description": "The path components starting from the key as base.",
            "items": {
              "type": "string"
            },
            "type": "array"
          }
        }
      ],
      "result": {
        "name": "state_get_item_result",
        "schema": {
          "additionalProperties": false,
          "description": "Result for \"state_get_item\" RPC response.",
          "properties": {
            "api_version": {
              "description": "The RPC API version.",
              "type": "string"
            },
            "merkle_proof": {
              "description": "The merkle proof.",
              "type": "string"
            },
            "stored_value": {
              "$ref": "#/components/schemas/StoredValue",
              "description": "The stored value."
            }
          },
          "required": [
            "api_version",
            "merkle_proof",
            "stored_value"
          ],
          "type": "object"
        }
      },
      "summary": "returns a stored value from the network"
    },
    {
      "examples": [
        {
          "name": "state_get_balance_example",
          "params": [
            {
              "name": "purse_uref",
              "value": "uref-09480c3248ef76b603d386f3f4f8a5f87f597d4eaffd475433f861af187ab5db-007"
            },
            {
              "name": "state_root_hash",
              "value": "0808080808080808080808080808080808080808080808080808080808080808"
            }
          ],
          "result": {
            "name": "state_get_balance_example_result",
            "value": {
              "api_version": "1.0.0",
              "balance_value": "123456",
              "merkle_proof": "936 chars"
            }
          }
        }
      ],
      "name": "state_get_balance",
      "params": [
        {
          "name": "state_root_hash",
          "required": true,
          "schema": {
            "$ref": "#/components/schemas/Digest",
            "description": "The hash of state root."
          }
        },
        {
          "name": "purse_uref",
          "required": true,
          "schema": {
            "description": "Formatted URef.",
            "type": "string"
          }
        }
      ],
      "result": {
        "name": "state_get_balance_result",
        "schema": {
          "additionalProperties": false,
          "description": "Result for \"state_get_balance\" RPC response.",
          "properties": {
            "api_version": {
              "description": "The RPC API version.",
              "type": "string"
            },
            "balance_value": {
              "$ref": "#/components/schemas/U512",
              "description": "The balance value."
            },
            "merkle_proof": {
              "description": "The merkle proof.",
              "type": "string"
            }
          },
          "required": [
            "api_version",
            "balance_value",
            "merkle_proof"
          ],
          "type": "object"
        }
      },
      "summary": "returns a purse's balance from the network"
    },
    {
      "examples": [
        {
          "name": "chain_get_era_info_by_switch_block_example",
          "params": [
            {
              "name": "block_identifier",
              "value": {
                "Hash": "528c63a9e30bf6e52b9d38f7c1a3e2ec035a54bfb29225d31ecedff00eebbe18"
              }
            }
          ],
          "result": {
            "name": "chain_get_era_info_by_switch_block_example_result",
            "value": {
              "api_version": "1.0.0",
              "era_summary": {
                "block_hash": "528c63a9e30bf6e52b9d38f7c1a3e2ec035a54bfb29225d31ecedff00eebbe18",
                "era_id": 42,
                "merkle_proof": "936 chars",
                "state_root_hash": "0808080808080808080808080808080808080808080808080808080808080808",
                "stored_value": {
                  "EraInfo": {
                    "seigniorage_allocations": []
                  }
                }
              }
            }
          }
        }
      ],
      "name": "chain_get_era_info_by_switch_block",
      "params": [
        {
          "name": "block_identifier",
          "required": true,
          "schema": {
            "$ref": "#/components/schemas/BlockIdentifier",
            "description": "The block identifier."
          }
        }
      ],
      "result": {
        "name": "chain_get_era_info_by_switch_block_result",
        "schema": {
          "additionalProperties": false,
          "description": "Result for \"chain_get_era_info\" RPC response.",
          "properties": {
            "api_version": {
              "description": "The RPC API version.",
              "type": "string"
            },
            "era_summary": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/EraSummary"
                },
                {
                  "type": "null"
                }
              ],
              "description": "The era summary."
            }
          },
          "required": [
            "api_version"
          ],
          "type": "object"
        }
      },
      "summary": "returns an EraInfo from the network"
    },
    {
      "examples": [
        {
          "name": "state_get_auction_info_example",
          "params": [],
          "result": {
            "name": "state_get_auction_info_example_result",
            "value": {
              "api_version": "1.0.0",
              "auction_state": {
                "bids": [
                  {
                    "bid": {
                      "bonding_purse": "uref-fafafafafafafafafafafafafafafafafafafafafafafafafafafafafafafafa-007",
                      "delegation_rate": 0,
                      "delegators": [],
                      "inactive": false,
                      "staked_amount": "10"
                    },
                    "public_key": "01197f6b23e16c8532c6abc838facd5ea789be0c76b2920334039bfa8b3d368d61"
                  }
                ],
                "block_height": 10,
                "era_validators": [
                  {
                    "era_id": 10,
                    "validator_weights": [
                      {
                        "public_key": "01197f6b23e16c8532c6abc838facd5ea789be0c76b2920334039bfa8b3d368d61",
                        "weight": "10"
                      }
                    ]
                  }
                ],
                "state_root_hash": "0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b"
              }
            }
          }
        }
      ],
      "name": "state_get_auction_info",
      "params": [],
      "result": {
        "name": "state_get_auction_info_result",
        "schema": {
          "additionalProperties": false,
          "description": "Result for \"state_get_auction_info\" RPC response.",
          "properties": {
            "api_version": {
              "description": "The RPC API version.",
              "type": "string"
            },
            "auction_state": {
              "$ref": "#/components/schemas/AuctionState",
              "description": "The auction state."
            }
          },
          "required": [
            "api_version",
            "auction_state"
          ],
          "type": "object"
        }
      },
      "summary": "returns the bids and validators as of the most recently added Block"
    }
  ],
  "openrpc": "1.0.0-rc1",
};

ReactDOM.render(<Documentation schema={schema} />, document.getElementById("root"));