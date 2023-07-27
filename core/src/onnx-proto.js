import * as protobuf from './protobuf'

export const OnnxProto = {}

OnnxProto.Version = {
    '_START_VERSION': 0,
    'IR_VERSION_2017_10_10': 1,
    'IR_VERSION_2017_10_30': 2,
    'IR_VERSION_2017_11_3': 3,
    'IR_VERSION_2019_1_22': 4,
    'IR_VERSION_2019_3_18': 5,
    'IR_VERSION_2019_9_19': 6,
    'IR_VERSION_2020_5_8': 7,
    'IR_VERSION_2021_7_30': 8,
    'IR_VERSION': 9,
}

OnnxProto.AttributeProto = class AttributeProto {

    constructor() {
        this.floats = []
        this.ints = []
        this.strings = []
        this.tensors = []
        this.graphs = []
        this.sparse_tensors = []
        this.type_protos = []
    }

    static decode(reader, length) {
        const message = new OnnxProto.AttributeProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string()
                    break
                case 21:
                    message.ref_attr_name = reader.string()
                    break
                case 13:
                    message.doc_string = reader.string()
                    break
                case 20:
                    message.type = reader.int32()
                    break
                case 2:
                    message.f = reader.float()
                    break
                case 3:
                    message.i = reader.int64()
                    break
                case 4:
                    message.s = reader.bytes()
                    break
                case 5:
                    message.t = OnnxProto.TensorProto.decode(reader, reader.uint32())
                    break
                case 6:
                    message.g = OnnxProto.GraphProto.decode(reader, reader.uint32())
                    break
                case 22:
                    message.sparse_tensor = OnnxProto.SparseTensorProto.decode(reader, reader.uint32())
                    break
                case 14:
                    message.tp = OnnxProto.TypeProto.decode(reader, reader.uint32())
                    break
                case 7:
                    message.floats = reader.floats(message.floats, tag)
                    break
                case 8:
                    message.ints = reader.array(message.ints, () => reader.int64(), tag)
                    break
                case 9:
                    message.strings.push(reader.bytes())
                    break
                case 10:
                    message.tensors.push(OnnxProto.TensorProto.decode(reader, reader.uint32()))
                    break
                case 11:
                    message.graphs.push(OnnxProto.GraphProto.decode(reader, reader.uint32()))
                    break
                case 23:
                    message.sparse_tensors.push(OnnxProto.SparseTensorProto.decode(reader, reader.uint32()))
                    break
                case 15:
                    message.type_protos.push(OnnxProto.TypeProto.decode(reader, reader.uint32()))
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.AttributeProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'name':
                    message.name = reader.string()
                    break
                case 'ref_attr_name':
                    message.ref_attr_name = reader.string()
                    break
                case 'doc_string':
                    message.doc_string = reader.string()
                    break
                case 'type':
                    message.type = reader.enum(OnnxProto.AttributeProto.AttributeType)
                    break
                case 'f':
                    message.f = reader.float()
                    break
                case 'i':
                    message.i = reader.int64()
                    break
                case 's':
                    message.s = reader.bytes()
                    break
                case 't':
                    message.t = OnnxProto.TensorProto.decodeText(reader)
                    break
                case 'g':
                    message.g = OnnxProto.GraphProto.decodeText(reader)
                    break
                case 'sparse_tensor':
                    message.sparse_tensor = OnnxProto.SparseTensorProto.decodeText(reader)
                    break
                case 'tp':
                    message.tp = OnnxProto.TypeProto.decodeText(reader)
                    break
                case 'floats':
                    reader.array(message.floats, () => reader.float())
                    break
                case 'ints':
                    reader.array(message.ints, () => reader.int64())
                    break
                case 'strings':
                    reader.array(message.strings, () => reader.bytes())
                    break
                case 'tensors':
                    message.tensors.push(OnnxProto.TensorProto.decodeText(reader))
                    break
                case 'graphs':
                    message.graphs.push(OnnxProto.GraphProto.decodeText(reader))
                    break
                case 'sparse_tensors':
                    message.sparse_tensors.push(OnnxProto.SparseTensorProto.decodeText(reader))
                    break
                case 'type_protos':
                    message.type_protos.push(OnnxProto.TypeProto.decodeText(reader))
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.AttributeProto.prototype.name = ''
OnnxProto.AttributeProto.prototype.ref_attr_name = ''
OnnxProto.AttributeProto.prototype.doc_string = ''
OnnxProto.AttributeProto.prototype.type = 0
OnnxProto.AttributeProto.prototype.f = 0
OnnxProto.AttributeProto.prototype.i = protobuf.Int64.create(0)
OnnxProto.AttributeProto.prototype.s = new Uint8Array([])
OnnxProto.AttributeProto.prototype.t = null
OnnxProto.AttributeProto.prototype.g = null
OnnxProto.AttributeProto.prototype.sparse_tensor = null
OnnxProto.AttributeProto.prototype.tp = null

OnnxProto.AttributeProto.AttributeType = {
    'UNDEFINED': 0,
    'FLOAT': 1,
    'INT': 2,
    'STRING': 3,
    'TENSOR': 4,
    'GRAPH': 5,
    'SPARSE_TENSOR': 11,
    'TYPE_PROTO': 13,
    'FLOATS': 6,
    'INTS': 7,
    'STRINGS': 8,
    'TENSORS': 9,
    'GRAPHS': 10,
    'SPARSE_TENSORS': 12,
    'TYPE_PROTOS': 14,
}

OnnxProto.ValueInfoProto = class ValueInfoProto {

    constructor() {
    }

    static decode(reader, length) {
        const message = new OnnxProto.ValueInfoProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string()
                    break
                case 2:
                    message.type = OnnxProto.TypeProto.decode(reader, reader.uint32())
                    break
                case 3:
                    message.doc_string = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.ValueInfoProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'name':
                    message.name = reader.string()
                    break
                case 'type':
                    message.type = OnnxProto.TypeProto.decodeText(reader)
                    break
                case 'doc_string':
                    message.doc_string = reader.string()
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.ValueInfoProto.prototype.name = ''
OnnxProto.ValueInfoProto.prototype.type = null
OnnxProto.ValueInfoProto.prototype.doc_string = ''

OnnxProto.NodeProto = class NodeProto {

    constructor() {
        this.input = []
        this.output = []
        this.attribute = []
    }

    static decode(reader, length) {
        const message = new OnnxProto.NodeProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.input.push(reader.string())
                    break
                case 2:
                    message.output.push(reader.string())
                    break
                case 3:
                    message.name = reader.string()
                    break
                case 4:
                    message.op_type = reader.string()
                    break
                case 7:
                    message.domain = reader.string()
                    break
                case 5:
                    message.attribute.push(OnnxProto.AttributeProto.decode(reader, reader.uint32()))
                    break
                case 6:
                    message.doc_string = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.NodeProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'input':
                    reader.array(message.input, () => reader.string())
                    break
                case 'output':
                    reader.array(message.output, () => reader.string())
                    break
                case 'name':
                    message.name = reader.string()
                    break
                case 'op_type':
                    message.op_type = reader.string()
                    break
                case 'domain':
                    message.domain = reader.string()
                    break
                case 'attribute':
                    message.attribute.push(OnnxProto.AttributeProto.decodeText(reader))
                    break
                case 'doc_string':
                    message.doc_string = reader.string()
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.NodeProto.prototype.name = ''
OnnxProto.NodeProto.prototype.op_type = ''
OnnxProto.NodeProto.prototype.domain = ''
OnnxProto.NodeProto.prototype.doc_string = ''

OnnxProto.TrainingInfoProto = class TrainingInfoProto {

    constructor() {
        this.initialization_binding = []
        this.update_binding = []
    }

    static decode(reader, length) {
        const message = new OnnxProto.TrainingInfoProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.initialization = OnnxProto.GraphProto.decode(reader, reader.uint32())
                    break
                case 2:
                    message.algorithm = OnnxProto.GraphProto.decode(reader, reader.uint32())
                    break
                case 3:
                    message.initialization_binding.push(OnnxProto.StringStringEntryProto.decode(reader, reader.uint32()))
                    break
                case 4:
                    message.update_binding.push(OnnxProto.StringStringEntryProto.decode(reader, reader.uint32()))
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TrainingInfoProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'initialization':
                    message.initialization = OnnxProto.GraphProto.decodeText(reader)
                    break
                case 'algorithm':
                    message.algorithm = OnnxProto.GraphProto.decodeText(reader)
                    break
                case 'initialization_binding':
                    message.initialization_binding.push(OnnxProto.StringStringEntryProto.decodeText(reader))
                    break
                case 'update_binding':
                    message.update_binding.push(OnnxProto.StringStringEntryProto.decodeText(reader))
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TrainingInfoProto.prototype.initialization = null
OnnxProto.TrainingInfoProto.prototype.algorithm = null

OnnxProto.ModelProto = class ModelProto {

    constructor() {
        this.opset_import = []
        this.metadata_props = []
        this.training_info = []
        this.functions = []
    }

    static decode(reader, length) {
        const message = new OnnxProto.ModelProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.ir_version = reader.int64()
                    break
                case 8:
                    message.opset_import.push(OnnxProto.OperatorSetIdProto.decode(reader, reader.uint32()))
                    break
                case 2:
                    message.producer_name = reader.string()
                    break
                case 3:
                    message.producer_version = reader.string()
                    break
                case 4:
                    message.domain = reader.string()
                    break
                case 5:
                    message.model_version = reader.int64()
                    break
                case 6:
                    message.doc_string = reader.string()
                    break
                case 7:
                    message.graph = OnnxProto.GraphProto.decode(reader, reader.uint32())
                    break
                case 14:
                    message.metadata_props.push(OnnxProto.StringStringEntryProto.decode(reader, reader.uint32()))
                    break
                case 20:
                    message.training_info.push(OnnxProto.TrainingInfoProto.decode(reader, reader.uint32()))
                    break
                case 25:
                    message.functions.push(OnnxProto.FunctionProto.decode(reader, reader.uint32()))
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.ModelProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'ir_version':
                    message.ir_version = reader.int64()
                    break
                case 'opset_import':
                    message.opset_import.push(OnnxProto.OperatorSetIdProto.decodeText(reader))
                    break
                case 'producer_name':
                    message.producer_name = reader.string()
                    break
                case 'producer_version':
                    message.producer_version = reader.string()
                    break
                case 'domain':
                    message.domain = reader.string()
                    break
                case 'model_version':
                    message.model_version = reader.int64()
                    break
                case 'doc_string':
                    message.doc_string = reader.string()
                    break
                case 'graph':
                    message.graph = OnnxProto.GraphProto.decodeText(reader)
                    break
                case 'metadata_props':
                    message.metadata_props.push(OnnxProto.StringStringEntryProto.decodeText(reader))
                    break
                case 'training_info':
                    message.training_info.push(OnnxProto.TrainingInfoProto.decodeText(reader))
                    break
                case 'functions':
                    message.functions.push(OnnxProto.FunctionProto.decodeText(reader))
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.ModelProto.prototype.ir_version = protobuf.Int64.create(0)
OnnxProto.ModelProto.prototype.producer_name = ''
OnnxProto.ModelProto.prototype.producer_version = ''
OnnxProto.ModelProto.prototype.domain = ''
OnnxProto.ModelProto.prototype.model_version = protobuf.Int64.create(0)
OnnxProto.ModelProto.prototype.doc_string = ''
OnnxProto.ModelProto.prototype.graph = null

OnnxProto.StringStringEntryProto = class StringStringEntryProto {

    constructor() {
    }

    static decode(reader, length) {
        const message = new OnnxProto.StringStringEntryProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string()
                    break
                case 2:
                    message.value = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.StringStringEntryProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'key':
                    message.key = reader.string()
                    break
                case 'value':
                    message.value = reader.string()
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.StringStringEntryProto.prototype.key = ''
OnnxProto.StringStringEntryProto.prototype.value = ''

OnnxProto.TensorAnnotation = class TensorAnnotation {

    constructor() {
        this.quant_parameter_tensor_names = []
    }

    static decode(reader, length) {
        const message = new OnnxProto.TensorAnnotation()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.tensor_name = reader.string()
                    break
                case 2:
                    message.quant_parameter_tensor_names.push(OnnxProto.StringStringEntryProto.decode(reader, reader.uint32()))
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TensorAnnotation()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'tensor_name':
                    message.tensor_name = reader.string()
                    break
                case 'quant_parameter_tensor_names':
                    message.quant_parameter_tensor_names.push(OnnxProto.StringStringEntryProto.decodeText(reader))
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TensorAnnotation.prototype.tensor_name = ''

OnnxProto.GraphProto = class GraphProto {

    constructor() {
        this.node = []
        this.initializer = []
        this.sparse_initializer = []
        this.input = []
        this.output = []
        this.value_info = []
        this.quantization_annotation = []
    }

    static decode(reader, length) {
        const message = new OnnxProto.GraphProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.node.push(OnnxProto.NodeProto.decode(reader, reader.uint32()))
                    break
                case 2:
                    message.name = reader.string()
                    break
                case 5:
                    message.initializer.push(OnnxProto.TensorProto.decode(reader, reader.uint32()))
                    break
                case 15:
                    message.sparse_initializer.push(OnnxProto.SparseTensorProto.decode(reader, reader.uint32()))
                    break
                case 10:
                    message.doc_string = reader.string()
                    break
                case 11:
                    message.input.push(OnnxProto.ValueInfoProto.decode(reader, reader.uint32()))
                    break
                case 12:
                    message.output.push(OnnxProto.ValueInfoProto.decode(reader, reader.uint32()))
                    break
                case 13:
                    message.value_info.push(OnnxProto.ValueInfoProto.decode(reader, reader.uint32()))
                    break
                case 14:
                    message.quantization_annotation.push(OnnxProto.TensorAnnotation.decode(reader, reader.uint32()))
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.GraphProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'node':
                    message.node.push(OnnxProto.NodeProto.decodeText(reader))
                    break
                case 'name':
                    message.name = reader.string()
                    break
                case 'initializer':
                    message.initializer.push(OnnxProto.TensorProto.decodeText(reader))
                    break
                case 'sparse_initializer':
                    message.sparse_initializer.push(OnnxProto.SparseTensorProto.decodeText(reader))
                    break
                case 'doc_string':
                    message.doc_string = reader.string()
                    break
                case 'input':
                    message.input.push(OnnxProto.ValueInfoProto.decodeText(reader))
                    break
                case 'output':
                    message.output.push(OnnxProto.ValueInfoProto.decodeText(reader))
                    break
                case 'value_info':
                    message.value_info.push(OnnxProto.ValueInfoProto.decodeText(reader))
                    break
                case 'quantization_annotation':
                    message.quantization_annotation.push(OnnxProto.TensorAnnotation.decodeText(reader))
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.GraphProto.prototype.name = ''
OnnxProto.GraphProto.prototype.doc_string = ''

OnnxProto.TensorProto = class TensorProto {

    constructor() {
        this.dims = []
        this.float_data = []
        this.int32_data = []
        this.string_data = []
        this.int64_data = []
        this.external_data = []
        this.double_data = []
        this.uint64_data = []
    }

    static decode(reader, length) {
        const message = new OnnxProto.TensorProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.dims = reader.array(message.dims, () => reader.int64(), tag)
                    break
                case 2:
                    message.data_type = reader.int32()
                    break
                case 3:
                    message.segment = OnnxProto.TensorProto.Segment.decode(reader, reader.uint32())
                    break
                case 4:
                    message.float_data = reader.floats(message.float_data, tag)
                    break
                case 5:
                    message.int32_data = reader.array(message.int32_data, () => reader.int32(), tag)
                    break
                case 6:
                    message.string_data.push(reader.bytes())
                    break
                case 7:
                    message.int64_data = reader.array(message.int64_data, () => reader.int64(), tag)
                    break
                case 8:
                    message.name = reader.string()
                    break
                case 12:
                    message.doc_string = reader.string()
                    break
                case 9:
                    message.raw_data = reader.bytes()
                    break
                case 13:
                    message.external_data.push(OnnxProto.StringStringEntryProto.decode(reader, reader.uint32()))
                    break
                case 14:
                    message.data_location = reader.int32()
                    break
                case 10:
                    message.double_data = reader.doubles(message.double_data, tag)
                    break
                case 11:
                    message.uint64_data = reader.array(message.uint64_data, () => reader.uint64(), tag)
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TensorProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'dims':
                    reader.array(message.dims, () => reader.int64())
                    break
                case 'data_type':
                    message.data_type = reader.int32()
                    break
                case 'segment':
                    message.segment = OnnxProto.TensorProto.Segment.decodeText(reader)
                    break
                case 'float_data':
                    reader.array(message.float_data, () => reader.float())
                    break
                case 'int32_data':
                    reader.array(message.int32_data, () => reader.int32())
                    break
                case 'string_data':
                    reader.array(message.string_data, () => reader.bytes())
                    break
                case 'int64_data':
                    reader.array(message.int64_data, () => reader.int64())
                    break
                case 'name':
                    message.name = reader.string()
                    break
                case 'doc_string':
                    message.doc_string = reader.string()
                    break
                case 'raw_data':
                    message.raw_data = reader.bytes()
                    break
                case 'external_data':
                    message.external_data.push(OnnxProto.StringStringEntryProto.decodeText(reader))
                    break
                case 'data_location':
                    message.data_location = reader.enum(OnnxProto.TensorProto.DataLocation)
                    break
                case 'double_data':
                    reader.array(message.double_data, () => reader.double())
                    break
                case 'uint64_data':
                    reader.array(message.uint64_data, () => reader.uint64())
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TensorProto.prototype.data_type = 0
OnnxProto.TensorProto.prototype.segment = null
OnnxProto.TensorProto.prototype.name = ''
OnnxProto.TensorProto.prototype.doc_string = ''
OnnxProto.TensorProto.prototype.raw_data = new Uint8Array([])
OnnxProto.TensorProto.prototype.data_location = 0

OnnxProto.TensorProto.DataType = {
    'UNDEFINED': 0,
    'FLOAT': 1,
    'UINT8': 2,
    'INT8': 3,
    'UINT16': 4,
    'INT16': 5,
    'INT32': 6,
    'INT64': 7,
    'STRING': 8,
    'BOOL': 9,
    'FLOAT16': 10,
    'DOUBLE': 11,
    'UINT32': 12,
    'UINT64': 13,
    'COMPLEX64': 14,
    'COMPLEX128': 15,
    'BFLOAT16': 16,
    'FLOAT8E4M3FN': 17,
    'FLOAT8E4M3FNUZ': 18,
    'FLOAT8E5M2': 19,
    'FLOAT8E5M2FNUZ': 20,
}

OnnxProto.TensorProto.Segment = class Segment {

    constructor() {
    }

    static decode(reader, length) {
        const message = new OnnxProto.TensorProto.Segment()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.begin = reader.int64()
                    break
                case 2:
                    message.end = reader.int64()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TensorProto.Segment()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'begin':
                    message.begin = reader.int64()
                    break
                case 'end':
                    message.end = reader.int64()
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TensorProto.Segment.prototype.begin = protobuf.Int64.create(0)
OnnxProto.TensorProto.Segment.prototype.end = protobuf.Int64.create(0)

OnnxProto.TensorProto.DataLocation = {
    'DEFAULT': 0,
    'EXTERNAL': 1,
}

OnnxProto.SparseTensorProto = class SparseTensorProto {

    constructor() {
        this.dims = []
    }

    static decode(reader, length) {
        const message = new OnnxProto.SparseTensorProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.values = OnnxProto.TensorProto.decode(reader, reader.uint32())
                    break
                case 2:
                    message.indices = OnnxProto.TensorProto.decode(reader, reader.uint32())
                    break
                case 3:
                    message.dims = reader.array(message.dims, () => reader.int64(), tag)
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.SparseTensorProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'values':
                    message.values = OnnxProto.TensorProto.decodeText(reader)
                    break
                case 'indices':
                    message.indices = OnnxProto.TensorProto.decodeText(reader)
                    break
                case 'dims':
                    reader.array(message.dims, () => reader.int64())
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.SparseTensorProto.prototype.values = null
OnnxProto.SparseTensorProto.prototype.indices = null

OnnxProto.TensorShapeProto = class TensorShapeProto {

    constructor() {
        this.dim = []
    }

    static decode(reader, length) {
        const message = new OnnxProto.TensorShapeProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.dim.push(OnnxProto.TensorShapeProto.Dimension.decode(reader, reader.uint32()))
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TensorShapeProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'dim':
                    message.dim.push(OnnxProto.TensorShapeProto.Dimension.decodeText(reader))
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TensorShapeProto.Dimension = class Dimension {

    constructor() {
    }

    get value() {
        OnnxProto.TensorShapeProto.Dimension.valueSet = OnnxProto.TensorShapeProto.Dimension.valueSet || new Set(['dim_value', 'dim_param'])
        return Object.keys(this).find((key) => OnnxProto.TensorShapeProto.Dimension.valueSet.has(key) && this[key] != null)
    }

    static decode(reader, length) {
        const message = new OnnxProto.TensorShapeProto.Dimension()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.dim_value = reader.int64()
                    break
                case 2:
                    message.dim_param = reader.string()
                    break
                case 3:
                    message.denotation = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TensorShapeProto.Dimension()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'dim_value':
                    message.dim_value = reader.int64()
                    break
                case 'dim_param':
                    message.dim_param = reader.string()
                    break
                case 'denotation':
                    message.denotation = reader.string()
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TensorShapeProto.Dimension.prototype.denotation = ''

OnnxProto.TypeProto = class TypeProto {

    constructor() {
    }

    get value() {
        OnnxProto.TypeProto.valueSet = OnnxProto.TypeProto.valueSet || new Set(['tensor_type', 'sequence_type', 'map_type', 'optional_type', 'sparse_tensor_type', 'opaque_type'])
        return Object.keys(this).find((key) => OnnxProto.TypeProto.valueSet.has(key) && this[key] != null)
    }

    static decode(reader, length) {
        const message = new OnnxProto.TypeProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.tensor_type = OnnxProto.TypeProto.Tensor.decode(reader, reader.uint32())
                    break
                case 4:
                    message.sequence_type = OnnxProto.TypeProto.Sequence.decode(reader, reader.uint32())
                    break
                case 5:
                    message.map_type = OnnxProto.TypeProto.Map.decode(reader, reader.uint32())
                    break
                case 9:
                    message.optional_type = OnnxProto.TypeProto.Optional.decode(reader, reader.uint32())
                    break
                case 8:
                    message.sparse_tensor_type = OnnxProto.TypeProto.SparseTensor.decode(reader, reader.uint32())
                    break
                case 7:
                    message.opaque_type = OnnxProto.TypeProto.Opaque.decode(reader, reader.uint32())
                    break
                case 6:
                    message.denotation = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TypeProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'tensor_type':
                    message.tensor_type = OnnxProto.TypeProto.Tensor.decodeText(reader)
                    break
                case 'sequence_type':
                    message.sequence_type = OnnxProto.TypeProto.Sequence.decodeText(reader)
                    break
                case 'map_type':
                    message.map_type = OnnxProto.TypeProto.Map.decodeText(reader)
                    break
                case 'optional_type':
                    message.optional_type = OnnxProto.TypeProto.Optional.decodeText(reader)
                    break
                case 'sparse_tensor_type':
                    message.sparse_tensor_type = OnnxProto.TypeProto.SparseTensor.decodeText(reader)
                    break
                case 'opaque_type':
                    message.opaque_type = OnnxProto.TypeProto.Opaque.decodeText(reader)
                    break
                case 'denotation':
                    message.denotation = reader.string()
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TypeProto.prototype.denotation = ''

OnnxProto.TypeProto.Tensor = class Tensor {

    constructor() {
    }

    static decode(reader, length) {
        const message = new OnnxProto.TypeProto.Tensor()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.elem_type = reader.int32()
                    break
                case 2:
                    message.shape = OnnxProto.TensorShapeProto.decode(reader, reader.uint32())
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TypeProto.Tensor()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'elem_type':
                    message.elem_type = reader.int32()
                    break
                case 'shape':
                    message.shape = OnnxProto.TensorShapeProto.decodeText(reader)
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TypeProto.Tensor.prototype.elem_type = 0
OnnxProto.TypeProto.Tensor.prototype.shape = null

OnnxProto.TypeProto.Sequence = class Sequence {

    constructor() {
    }

    static decode(reader, length) {
        const message = new OnnxProto.TypeProto.Sequence()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.elem_type = OnnxProto.TypeProto.decode(reader, reader.uint32())
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TypeProto.Sequence()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'elem_type':
                    message.elem_type = OnnxProto.TypeProto.decodeText(reader)
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TypeProto.Sequence.prototype.elem_type = null

OnnxProto.TypeProto.Map = class Map {

    constructor() {
    }

    static decode(reader, length) {
        const message = new OnnxProto.TypeProto.Map()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.key_type = reader.int32()
                    break
                case 2:
                    message.value_type = OnnxProto.TypeProto.decode(reader, reader.uint32())
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TypeProto.Map()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'key_type':
                    message.key_type = reader.int32()
                    break
                case 'value_type':
                    message.value_type = OnnxProto.TypeProto.decodeText(reader)
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TypeProto.Map.prototype.key_type = 0
OnnxProto.TypeProto.Map.prototype.value_type = null

OnnxProto.TypeProto.Optional = class Optional {

    constructor() {
    }

    static decode(reader, length) {
        const message = new OnnxProto.TypeProto.Optional()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.elem_type = OnnxProto.TypeProto.decode(reader, reader.uint32())
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TypeProto.Optional()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'elem_type':
                    message.elem_type = OnnxProto.TypeProto.decodeText(reader)
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TypeProto.Optional.prototype.elem_type = null

OnnxProto.TypeProto.SparseTensor = class SparseTensor {

    constructor() {
    }

    static decode(reader, length) {
        const message = new OnnxProto.TypeProto.SparseTensor()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.elem_type = reader.int32()
                    break
                case 2:
                    message.shape = OnnxProto.TensorShapeProto.decode(reader, reader.uint32())
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TypeProto.SparseTensor()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'elem_type':
                    message.elem_type = reader.int32()
                    break
                case 'shape':
                    message.shape = OnnxProto.TensorShapeProto.decodeText(reader)
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TypeProto.SparseTensor.prototype.elem_type = 0
OnnxProto.TypeProto.SparseTensor.prototype.shape = null

OnnxProto.TypeProto.Opaque = class Opaque {

    constructor() {
    }

    static decode(reader, length) {
        const message = new OnnxProto.TypeProto.Opaque()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.domain = reader.string()
                    break
                case 2:
                    message.name = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.TypeProto.Opaque()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'domain':
                    message.domain = reader.string()
                    break
                case 'name':
                    message.name = reader.string()
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.TypeProto.Opaque.prototype.domain = ''
OnnxProto.TypeProto.Opaque.prototype.name = ''

OnnxProto.OperatorSetIdProto = class OperatorSetIdProto {

    constructor() {
    }

    static decode(reader, length) {
        const message = new OnnxProto.OperatorSetIdProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.domain = reader.string()
                    break
                case 2:
                    message.version = reader.int64()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.OperatorSetIdProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'domain':
                    message.domain = reader.string()
                    break
                case 'version':
                    message.version = reader.int64()
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.OperatorSetIdProto.prototype.domain = ''
OnnxProto.OperatorSetIdProto.prototype.version = protobuf.Int64.create(0)

OnnxProto.OperatorStatus = {
    'EXPERIMENTAL': 0,
    'STABLE': 1,
}

OnnxProto.FunctionProto = class FunctionProto {

    constructor() {
        this.input = []
        this.output = []
        this.attribute = []
        this.attribute_proto = []
        this.node = []
        this.opset_import = []
    }

    static decode(reader, length) {
        const message = new OnnxProto.FunctionProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string()
                    break
                case 4:
                    message.input.push(reader.string())
                    break
                case 5:
                    message.output.push(reader.string())
                    break
                case 6:
                    message.attribute.push(reader.string())
                    break
                case 11:
                    message.attribute_proto.push(OnnxProto.AttributeProto.decode(reader, reader.uint32()))
                    break
                case 7:
                    message.node.push(OnnxProto.NodeProto.decode(reader, reader.uint32()))
                    break
                case 8:
                    message.doc_string = reader.string()
                    break
                case 9:
                    message.opset_import.push(OnnxProto.OperatorSetIdProto.decode(reader, reader.uint32()))
                    break
                case 10:
                    message.domain = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.FunctionProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'name':
                    message.name = reader.string()
                    break
                case 'input':
                    reader.array(message.input, () => reader.string())
                    break
                case 'output':
                    reader.array(message.output, () => reader.string())
                    break
                case 'attribute':
                    reader.array(message.attribute, () => reader.string())
                    break
                case 'attribute_proto':
                    message.attribute_proto.push(OnnxProto.AttributeProto.decodeText(reader))
                    break
                case 'node':
                    message.node.push(OnnxProto.NodeProto.decodeText(reader))
                    break
                case 'doc_string':
                    message.doc_string = reader.string()
                    break
                case 'opset_import':
                    message.opset_import.push(OnnxProto.OperatorSetIdProto.decodeText(reader))
                    break
                case 'domain':
                    message.domain = reader.string()
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.FunctionProto.prototype.name = ''
OnnxProto.FunctionProto.prototype.doc_string = ''
OnnxProto.FunctionProto.prototype.domain = ''

OnnxProto.OperatorProto = class OperatorProto {

    constructor() {
    }

    static decode(reader, length) {
        const message = new OnnxProto.OperatorProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.op_type = reader.string()
                    break
                case 2:
                    message.since_version = reader.int64()
                    break
                case 3:
                    message.status = reader.int32()
                    break
                case 10:
                    message.doc_string = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.OperatorProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'op_type':
                    message.op_type = reader.string()
                    break
                case 'since_version':
                    message.since_version = reader.int64()
                    break
                case 'status':
                    message.status = reader.enum(OnnxProto.OperatorStatus)
                    break
                case 'doc_string':
                    message.doc_string = reader.string()
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.OperatorProto.prototype.op_type = ''
OnnxProto.OperatorProto.prototype.since_version = protobuf.Int64.create(0)
OnnxProto.OperatorProto.prototype.status = 0
OnnxProto.OperatorProto.prototype.doc_string = ''

OnnxProto.OperatorSetProto = class OperatorSetProto {

    constructor() {
        this.operator = []
        this.functions = []
    }

    static decode(reader, length) {
        const message = new OnnxProto.OperatorSetProto()
        const end = length !== undefined ? reader.position + length : reader.length
        while (reader.position < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.magic = reader.string()
                    break
                case 2:
                    message.ir_version = reader.int64()
                    break
                case 3:
                    message.ir_version_prerelease = reader.string()
                    break
                case 7:
                    message.ir_build_metadata = reader.string()
                    break
                case 4:
                    message.domain = reader.string()
                    break
                case 5:
                    message.opset_version = reader.int64()
                    break
                case 6:
                    message.doc_string = reader.string()
                    break
                case 8:
                    message.operator.push(OnnxProto.OperatorProto.decode(reader, reader.uint32()))
                    break
                case 9:
                    message.functions.push(OnnxProto.FunctionProto.decode(reader, reader.uint32()))
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }

    static decodeText(reader) {
        const message = new OnnxProto.OperatorSetProto()
        reader.start()
        while (!reader.end()) {
            const tag = reader.tag()
            switch (tag) {
                case 'magic':
                    message.magic = reader.string()
                    break
                case 'ir_version':
                    message.ir_version = reader.int64()
                    break
                case 'ir_version_prerelease':
                    message.ir_version_prerelease = reader.string()
                    break
                case 'ir_build_metadata':
                    message.ir_build_metadata = reader.string()
                    break
                case 'domain':
                    message.domain = reader.string()
                    break
                case 'opset_version':
                    message.opset_version = reader.int64()
                    break
                case 'doc_string':
                    message.doc_string = reader.string()
                    break
                case 'operator':
                    message.operator.push(OnnxProto.OperatorProto.decodeText(reader))
                    break
                case 'functions':
                    message.functions.push(OnnxProto.FunctionProto.decodeText(reader))
                    break
                default:
                    reader.field(tag, message)
                    break
            }
        }
        return message
    }
}

OnnxProto.OperatorSetProto.prototype.magic = ''
OnnxProto.OperatorSetProto.prototype.ir_version = protobuf.Int64.create(0)
OnnxProto.OperatorSetProto.prototype.ir_version_prerelease = ''
OnnxProto.OperatorSetProto.prototype.ir_build_metadata = ''
OnnxProto.OperatorSetProto.prototype.domain = ''
OnnxProto.OperatorSetProto.prototype.opset_version = protobuf.Int64.create(0)
OnnxProto.OperatorSetProto.prototype.doc_string = ''
